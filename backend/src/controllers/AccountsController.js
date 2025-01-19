import {
  createAccount,
  getAllAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
} from "../services/AccountsService";

const validateAccountData = (data) => {
  const errors = [];
  if (!data.name || typeof data.name !== "string") {
    errors.push("Account name must be a non-empty string.");
  }
  if (data.balance === undefined || typeof data.balance !== "number" || data.balance < 0) {
    errors.push("Balance must be a non-negative number.");
  }
  return errors;
};

export const addAccountController = async (req, res) => {
  try {
    const userId = req.user.id; // Logged-in user's ID
    const errors = validateAccountData(req.body);
    if (errors.length) {
      return res.status(400).json({ success: false, errors });
    }
    const account = await createAccount({ ...req.body, userId });
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: account,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const Accounts = async (req, res) => {
  try {
    const { role, id: userId } = req.user;
    let accounts;

    // Fetch accounts based on user role
    if (role === "superadmin") {
      accounts = await getAllAccounts();
    } else {
      accounts = await getAllAccounts({ userId });
    }

    // Summarize accounts and transactions
    const summary = accounts.map((account) => {
      const totalIncome = account.transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

      const totalExpense = account.transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

      const transactionStatus = account.transactions.length > 0
        ? `Has ${account.transactions.length} transactions`
        : "No transactions";

      return {
        accountId: account.id,
        name: account.name,
        accountType: account.accountType,
        balance: account.balance,
        totalIncome,
        totalExpense,
        transactionStatus,
      };
    });

    // Calculate total income and total expense for all accounts
    const totalIncomeAllAccounts = summary.reduce((sum, acc) => sum + acc.totalIncome, 0);
    const totalExpenseAllAccounts = summary.reduce((sum, acc) => sum + acc.totalExpense, 0);

    const totalBalance = summary.reduce((sum, acc) => sum + acc.balance, 0);

    // Add summary to the original response
    res.status(200).json({
      success: true,
      message: "Accounts retrieved successfully",
      data: accounts,
      summary: {
        totalBalance,
        totalIncome: totalIncomeAllAccounts,
        totalExpense: totalExpenseAllAccounts,
        accounts: summary,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const getOneAccountController = async (req, res) => {
  try {
    const { role, id: userId } = req.user;
    const account = await getAccountById(req.params.id);

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }
    if (account.userId != userId) {
      return res.status(404).json({
        success: false,
        message: "Account not yours",
      });
    }

    if (role !== "superadmin" && account.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.status(200).json({
      success: true,
      message: "Account retrieved successfully",
      data: account,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateAccountController = async (req, res) => {
  try {
    const { role, id: userId } = req.user;
    const account = await getAccountById(req.params.id);

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    if (role !== "superadmin" && account.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const errors = validateAccountData(req.body);
    if (errors.length) {
      return res.status(400).json({ success: false, errors });
    }

    const updatedAccount = await updateAccount(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Account updated successfully",
      data: updatedAccount,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteOneAccountController = async (req, res) => {
  try {
    const { role, id: userId } = req.user;
    const account = await getAccountById(req.params.id);

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    if (role !== "superadmin" && account.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    await deleteAccount(req.params.id);
    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
