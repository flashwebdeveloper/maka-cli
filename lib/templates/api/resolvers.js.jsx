export const resolvers = {
  Query: {
      <%= camelCase %>(root, args, context) {
          return 'hello <%= camelCase %>';
    }
  }
};
