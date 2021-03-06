export const typeDefs = ["type AddFriendResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  AddFriend(email: String!): AddFriendResponse!\n  FacebookConnect(name: String!, email: String, fbId: String!): FacebookConnectResponse!\n  RemoveFriend(email: String!): RemoveFriendResponse!\n  RemoveUser: RemoveUserResponse!\n  SignIn(email: String!, password: String!): SignInResponse!\n  SignUp(email: String!, name: String!, country: String, age: Int, password: String!): SignUpResponse!\n}\n\ntype FacebookConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype RemoveFriendResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype RemoveUserResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype SearchUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype Query {\n  SearchUser(email: String): SearchUserResponse!\n  GetCurrentUser: GetCurrentUserResponse!\n}\n\ntype User {\n  id: Int!\n  email: String\n  verifiedEmail: Boolean!\n  phoneNumber: String\n  verifiedPhoneNumber: Boolean!\n  profilePhoto: String\n  name: String!\n  fbId: String\n  password: String\n  friendsList: [User]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype SignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype SignUpResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype GetCurrentUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String!\n}\n"];
/* tslint:disable */

export interface Query {
  SearchUser: SearchUserResponse;
  GetCurrentUser: GetCurrentUserResponse;
}

export interface SearchUserQueryArgs {
  email: string | null;
}

export interface SearchUserResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface User {
  id: number;
  email: string | null;
  verifiedEmail: boolean;
  phoneNumber: string | null;
  verifiedPhoneNumber: boolean;
  profilePhoto: string | null;
  name: string;
  fbId: string | null;
  password: string | null;
  friendsList: Array<User> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetCurrentUserResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface Mutation {
  AddFriend: AddFriendResponse;
  FacebookConnect: FacebookConnectResponse;
  RemoveFriend: RemoveFriendResponse;
  RemoveUser: RemoveUserResponse;
  SignIn: SignInResponse;
  SignUp: SignUpResponse;
}

export interface AddFriendMutationArgs {
  email: string;
}

export interface FacebookConnectMutationArgs {
  name: string;
  email: string | null;
  fbId: string;
}

export interface RemoveFriendMutationArgs {
  email: string;
}

export interface SignInMutationArgs {
  email: string;
  password: string;
}

export interface SignUpMutationArgs {
  email: string;
  name: string;
  country: string | null;
  age: number | null;
  password: string;
}

export interface AddFriendResponse {
  ok: boolean;
  error: string | null;
}

export interface FacebookConnectResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface RemoveFriendResponse {
  ok: boolean;
  error: string | null;
}

export interface RemoveUserResponse {
  ok: boolean;
  error: string | null;
}

export interface SignInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface SignUpResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface Verification {
  id: number;
  target: string;
  payload: string;
  key: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}
