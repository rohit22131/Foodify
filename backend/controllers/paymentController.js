// controllers/paymentController.js

export const processDummyPayment = (req, res) => {
  const { name, cardNumber, expiry, cvv } = req.body;

  if (!name || !cardNumber || !expiry || !cvv) {
    return res
      .status(400)
      .json({ success: false, message: "Missing payment fields" });
  }

  setTimeout(() => {
    return res.status(200).json({
      success: true,
      message: "Dummy payment successful",
    });
  }, 1500);
};
