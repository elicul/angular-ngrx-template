var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var UserType = require('../types/user');
var UserModel = require('../../models/user');

exports.addUser = {
  type: UserType.userType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve(root, params) {
    const uModel = new UserModel(params);
    const newUser = uModel.save();
    if (!newUser) {
      throw new Error('Error');
    }
    return newUser
  }
}

exports.updateUser = {
    type: UserType.userType,
    args: {
      id: {
        name: 'id',
        type: new GraphQLNonNull(GraphQLString)
      },
      name: {
        type: new GraphQLNonNull(GraphQLString),
      }
    },
    resolve(root, params) {
      return UserModel.findByIdAndUpdate(
        params.id,
        { $set: { name: params.name } },
        { new: true }
      )
        .catch(err => new Error(err));
    }
}

exports.removeUser = {
    type: UserType.userType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve(root, params) {
      const removeduser = UserModel.findByIdAndRemove(params.id).exec();
      if (!removeduser) {
        throw new Error('Error')
      }
      return removeduser;
    }
}