import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "src/content/projects/*",
      schema: {
        title: fields.text({ label: "Title" }),
        description: fields.text({ label: "Description" }),
        longDescription: fields.text({
          label: "Long Description",
          multiline: true,
        }),
        image: fields.image({ label: "Cover Image" }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (item) => item.value,
        }),
        liveUrl: fields.url({ label: "Live URL" }),
        sourceUrl: fields.url({ label: "Source URL" }),
        featured: fields.checkbox({ label: "Featured" }),
        publishedAt: fields.date({ label: "Published At" }),
      },
    }),
    skills: collection({
      label: "Skills",
      slugField: "name",
      path: "src/content/skills/*",
      schema: {
        name: fields.text({ label: "Name" }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Frontend", value: "frontend" },
            { label: "Backend", value: "backend" },
            { label: "Design", value: "design" },
            { label: "Hardware", value: "hardware" },
            { label: "Tools", value: "tools" },
          ],
          defaultValue: "frontend",
        }),
        icon: fields.text({ label: "Icon (Lucide name)" }),
        level: fields.select({
          label: "Level",
          options: [
            { label: "Beginner", value: "beginner" },
            { label: "Intermediate", value: "intermediate" },
            { label: "Advanced", value: "advanced" },
            { label: "Expert", value: "expert" },
          ],
          defaultValue: "intermediate",
        }),
      },
    }),
    services: collection({
      label: "Services",
      slugField: "title",
      path: "src/content/services/*",
      schema: {
        title: fields.text({ label: "Title" }),
        description: fields.text({ label: "Description" }),
        features: fields.array(fields.text({ label: "Feature" }), {
          label: "Features",
          itemLabel: (item) => item.value,
        }),
        icon: fields.text({ label: "Icon (Lucide name)" }),
        featured: fields.checkbox({ label: "Featured" }),
      },
    }),
    blog: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "src/content/blog/*",
      schema: {
        title: fields.text({ label: "Title" }),
        excerpt: fields.text({ label: "Excerpt" }),
        coverImage: fields.image({ label: "Cover Image" }),
        publishedAt: fields.date({ label: "Published At" }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (item) => item.value,
        }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
    profile: collection({
      label: "Profile",
      slugField: "name",
      path: "src/content/profile/*",
      schema: {
        name: fields.text({ label: "Name" }),
        title: fields.text({ label: "Title" }),
        bio: fields.text({ label: "Bio", multiline: true }),
        avatar: fields.image({ label: "Avatar" }),
        socialLinks: fields.object({
          github: fields.url({ label: "GitHub URL" }),
          twitter: fields.url({ label: "Twitter URL" }),
          linkedin: fields.url({ label: "LinkedIn URL" }),
          website: fields.url({ label: "Website URL" }),
        }),
      },
    }),
  },
});
