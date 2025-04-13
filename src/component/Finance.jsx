import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";

const Finance = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const formik = useFormik({
    initialValues: {
      amount: "",
      description: "",
      category: "",
      type: "",
      date: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.amount) errors.amount = "Amount is required";
      if (!values.description) errors.description = "Description is required";
      if (!values.category) errors.category = "Category is required";
      if (!values.type) errors.type = "Transaction type is required";
      if (!values.date) errors.date = "Date is required";
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      setTransactions((prev) => [...prev, values]);
      resetForm();
    },
  });

  const handleDelete = (indexToDelete) => {
    const updatedTransactions = transactions.filter(
      (_, index) => index !== indexToDelete
    );
    setTransactions(updatedTransactions);
  };
  const filteredTransactions = transactions.filter((item) =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Finance Tracker</h2>

      <form onSubmit={formik.handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Amount</label>
          <input
            type="number"
            name="amount"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.amount}
          />
          {formik.errors.amount && (
            <div className="text-danger">{formik.errors.amount}</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.errors.description && (
            <div className="text-danger">{formik.errors.description}</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Category</label>
          <input
            type="text"
            name="category"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.category}
          />
          {formik.errors.category && (
            <div className="text-danger">{formik.errors.category}</div>
          )}
        </div>
        <div className="col-md-6">
          <label className="form-label">Transaction Type</label>
          <select
            name="type"
            className="form-select"
            onChange={formik.handleChange}
            value={formik.values.type}
          >
            <option value=""> </option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          {formik.errors.type && (
            <div className="text-danger">{formik.errors.type}</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.date}
          />
          {formik.errors.date && (
            <div className="text-danger">{formik.errors.date}</div>
          )}
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Add Transaction
          </button>
        </div>
      </form>

      <hr className="my-4" />

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {console.log("searchTerm: ", searchTerm)}
      </div>

      <h4>All Transactions</h4>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx, index) => (
              <tr key={index}>
                <td>{tx.amount}</td>
                <td>{tx.description}</td>
                <td>{tx.category}</td>
                <td>{tx.type}</td>
                <td>{tx.date}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(transactions.indexOf(tx))}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No matching transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Finance;
