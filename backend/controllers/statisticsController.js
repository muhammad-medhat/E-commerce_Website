const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const User = require("../model/userModel");
const Order = require("../model/orderModel");

const ONE_DAY = 24 * 60 * 60 * 1000;

const countActiveAndDeactivatedUsers = asyncHandler(async (req, res) => {
  const activeUsersFilter = User.aggregate([
    { $match: { status: "ACTIVE" } },
    { $count: "active" },
  ]);
  const deactivatedUsersFilter = User.aggregate([
    { $match: { status: "DEACTIVATED" } },
    { $count: "deactivated" },
  ]);

  const [activeUsers, deactivatedUsers] = await Promise.all([
    activeUsersFilter,
    deactivatedUsersFilter,
  ]);

  const numberOfActiveUsers = activeUsers[0]?.active || 0;
  const numberOfDeactivatedUsers = deactivatedUsers[0]?.deactivated || 0;
  res.status(200).json({
    activeUsers: numberOfActiveUsers,
    deactivatedUsers: numberOfDeactivatedUsers,
    total: numberOfActiveUsers + numberOfDeactivatedUsers,
  });
});

const countNewUsers = asyncHandler(async (req, res) => {
  // get the number of new customers in the last 7 days
  const newUsersFilter = User.aggregate([
    {
      $match: {
        createdAt: { $gte: new Date(Date.now() - 7 * ONE_DAY) },
      },
    },
    { $count: "newUsers" },
  ]);
  const newUsers = await newUsersFilter;
  const numberOfNewCustomers = newUsers[0]?.newUsers || 0;
  res.status(200).json({
    newUsers: numberOfNewCustomers,
  });
});

const countOrdersToday = asyncHandler(async (req, res) => {
  const countOrdersTodayFilter = Order.aggregate([
    {
      $match: {
        createdAt: { $gte: new Date(Date.now() - ONE_DAY) },
      },
    },
    { $count: "ordersToday" },
  ]);

  const countOrdersToday = await countOrdersTodayFilter;
  const numberOfOrdersToday = countOrdersToday[0]?.ordersToday || 0;
  res.status(200).json({ ordersToday: numberOfOrdersToday });
});

const numberOfOrders = asyncHandler(async (req, res) => {
  const numberOfPendingOrdersFilter = Order.aggregate([
    { $match: { status: "pending" } },
    { $count: "orders" },
  ]);
  const numberOfInReviewOrdersFilter = Order.aggregate([
    { $match: { status: "in review" } },
    { $count: "orders" },
  ]);
  const numberOfInProgressOrdersFilter = Order.aggregate([
    { $match: { status: "in progress" } },
    { $count: "orders" },
  ]);

  const numberOfOnTheWayOrdersFilter = Order.aggregate([
    { $match: { status: "on the way" } },
    { $count: "orders" },
  ]);
  const numberOfDeliveredOrdersFilter = Order.aggregate([
    { $match: { status: "delivered" } },
    { $count: "orders" },
  ]);

  const [
    numberOfPendingOrders,
    numberOfInReviewOrders,
    numberOfInProgressOrders,
    numberOfOnTheWayOrders,
    numberOfDeliveredOrders,
  ] = await Promise.all([
    numberOfPendingOrdersFilter,
    numberOfInReviewOrdersFilter,
    numberOfInProgressOrdersFilter,
    numberOfOnTheWayOrdersFilter,
    numberOfDeliveredOrdersFilter,
  ]);

  const countOfPendingOrders = numberOfPendingOrders[0]?.orders || 0;
  const countOfInReviewOrders = numberOfInReviewOrders[0]?.orders || 0;
  const countOfInProgressOrders = numberOfInProgressOrders[0]?.orders || 0;
  const countOfOnTheWayOrders = numberOfOnTheWayOrders[0]?.orders || 0;
  const countOfDeliveredOrders = numberOfDeliveredOrders[0]?.orders || 0;
  res.status(200).json({
    pending: countOfPendingOrders,
    inReview: countOfInReviewOrders,
    inProgress: countOfInProgressOrders,
    onTheWay: countOfOnTheWayOrders,
    delivered: countOfDeliveredOrders,
    total:
      countOfPendingOrders +
      countOfInReviewOrders +
      countOfInProgressOrders +
      countOfOnTheWayOrders +
      countOfDeliveredOrders,
  });
});

const incomeThisWeek = asyncHandler(async (req, res) => {
  const incomeThisWeekFilter = Order.aggregate([
    {
      $match: {
        createdAt: { $gte: new Date(Date.now() - 7 * ONE_DAY) },
      },
    },
  ]);

  const incomeThisWeek = await incomeThisWeekFilter;
  const totalIncomeThisWeek = incomeThisWeek.reduce(
    (acc, order) => acc + (order.price || 0),
    0
  );
  res.status(200).json({ income: totalIncomeThisWeek });
});

module.exports = {
  countActiveAndDeactivatedUsers,
  countNewUsers,
  countOrdersToday,
  numberOfOrders,
  incomeThisWeek,
};
