import { gql } from 'apollo-server-core';

export const schema = gql`

    type DeletionPayload {
      success: Boolean
    }

    type Task {
      id: Int
      name: String
    }

    type Query {
      task(id: ID!): Task
      tasks: [Task]
    }

    type Mutation {
      addTask(name: String!): Task
      updateTask(id: ID!, name: String!): Task
      deleteTask(id: ID!): DeletionPayload
    }
  `;
