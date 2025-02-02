import { ConvexError, v } from "convex/values";

import { mutation } from "./_generated/server";

export const createProject = mutation({
  args: {
    projectName: v.string(),
    githubUrl: v.string(), // Required GitHub URL
    githubToken: v.optional(v.string()), // Optional GitHub token
    // Accept sharedWith as an optional record with emails as keys and roles as values
    sharedWith: v.optional(v.record(v.string(), v.string())),
  },
  async handler(ctx, args) {
    // Get the authenticated user's identity
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("User not authenticated");
    }

    // Find the user in the database by their email from the identity
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    // Insert a new project linked to the authenticated user.
    // The sharedWith field will use the passed object or default to an empty object.
    const projectId = await ctx.db.insert("project", {
      userId: user._id,
      projectName: args.projectName,
      githubUrl: args.githubUrl,
      githubToken: args.githubToken || "",
      role: "owner", // The creator is the owner.
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: "",
      sharedWith: args.sharedWith || {}, // Default to an empty object if not provided.
    });

    return { projectId };
  },
});
