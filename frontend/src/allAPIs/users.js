// use common js module to export the functions


// @desc    user can update its account data
// @route   PUT /api/users/user
// @access  Private

// @desc    Register User
// @route   POST /api/users/register
// @access  Public


// @desc    GET a user
// @route   GET /api/users/
// @access  Private


// @desc    login a user
// @route   POST /api/users/login
// @access  Public


// @desc    logout a user
// @route   GET /api/users/logout
// @access  Private
module.exports = {
    updateUser,
    regUser,
    getUser,
    logoutUser,
    loginUser,
    getUserId
}