- [Quick Start](#quick-start)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
  - [Upgrading Dependencies](#upgrading-dependencies)
  - [Images](#images)
- [Blog Post Formatting Guidelines](#blog-post-formatting-guidelines)
  - [Date](#date)
  - [Summary](#summary)
  - [Slug](#slug)
  - [Footnotes](#footnotes)
  - [Article Notes](#article-notes)
  - [Images](#images)
  - [Edits](#edits)
  - [Header Links](#header-links)
- [Updating Blog Posts](#updating-blog-posts)
  - [ClojureScript Versions](#clojureScript-versions)
  - [Figwheel Versions](#figwheel-versions)
  - [Clojure Survey](#clojure-survey)
  - [Create Reagent App Versions](#create-reagent-app-versions)
- [Special Thanks](#special-thanks)

## Quick start

1. **Clone blog**

   ```sh-
   git clone git@github.com:athomasoriginal/blog.git
   ```

1. **Install blog dependencies**

   ```sh
   yarn install
   ```

   > run this command from the root of blog

1. **Start blog**

   ```sh
   npx gatsby develop
   ```

   > Using `npx` is a dev convience so you do not have to install gatsby globally

Your site is now running at `http://localhost:8000`!

> You'll also see a second link: `http://localhost:8000/___graphql`. This is a tool you can use to experiment with querying your data.

## Configuration

### Environment Variables

- environment variables are required for google analytics. To set these, create an `.env.development` and `.env.production` and set each to look like:

  ```bash
  # Envvironment Variables

  GATSBY_GA_TRACKING_ID=to-come-later
  ```

### Upgrading Dependencies

> You will notice that my dependencies in package.json are exact versions. The reason for this is because of how tools like yarn and npm work. For example, if you run yarn upgrade, yarn looks at your package.json dep versions and will update to the highest version they allow. The problem with this is that semantic versioning is not a respected or consistent metric in JavaScript so a minor change could be breaking. Should it be? No, of course not, but that does not mean it will not be. For safety, we lock down to exact versions.

- Find outdated packages

  ```bash
  yarn outdated
  ```

- Upgrade specific packages in package.json

  ```bash
  yarn upgrade <package-name> --latest
  ```

  > Above is fine if you want to upgrade to latest and to have the package.json also updated.

If you find there are a lot of outdated packages try using

```bash
yarn upgrade --latest --pattern "gatsby-"
```

> Replace "gatsby-" with the common pattern.

### Images

Images used directly in the blog are currently found in the `static` directory.  This strategy forgoes image optimization.  Normally this is not the best choice because we forgo image optimization can Gatsby can provide.  However, I went this route because for the time being I only have 1 image to use and most everything else is an SVG.  See [Official Gatsby Guide](https://www.gatsbyjs.org/docs/static-folder/) for more details.

## Blog Post Formatting Guidelines

### Date

- Date Formatting

  ```bash
  # no bueno
  February 09, 2018

  # no bueno
  2019, 09 February

  # good
  09 February 2019
  ```

> For a blog post to have properly formatted dates you must include the date in the blog posts markdown frontmatter

Note there are two types of dates associated to each blog post:

- datePublished
- dateModified

The motivation for these is to help the reader assess the relevance of the content.  My goal is to have posts that will continue to be useful as the blog ages so I don't have to continue rewriting everything as I go.

### Summary

`gatsby-transformer-remark` will provide you with what they call an `excerpt` of the content in your markdown file. The `excerpt` is the first 140 characters of your markdown file. While you can set it to be whatever you like, I prefer custom excerpts. Thus, to add a custom excerpt you must add a `summary` field to your `frontmatter`. Please limit to 140 characters.

Also used for the SEO description

### Slug

By default Gatsby will use the file path provided and filename to provide your slugs with names. For example, if you have a markdown file structure like:

```bash
├── blog-posts
│   └── 001-initial-post.md
```

You will end up with a `slug` like `www.my-site.com/001-initial-post/`. For any number of reasons you might want your `slug` to have a different name compared to your directory/filename structure. For example, in the above case you may have used the prefix `001` as a way to organize your blog posts, but you don't actually want to use `001` in the slug as it's for internal use only. To fix this, you can add a `slug` field to your markdown file like this:

```markdown
---
title: 'The first post'
date: '2019-02-10'
slug: my-custom-slug <--- this
---
```

with the above, your slug will now look like `www.my-site.com/my-custom-slug/`. Please also keep in mind rules for naming slugs:

- Custom Slugs

  ```bash
  # no bueno
  my_custom_slug

  # no bueno
  myCustomSlug

  # good
  my-custom-slug
  ```

  > perfer lisp case as I feel it is more readable

> @note The URL segments of the URL can be set in `gatsby-node.js`.

Also used for the SEO ogURL

### Footnotes

Footnotes are great when you have additional clarifying comments or want to credit someone else work etc. For this reason, I provide a quick way of adding footnotes to your blog posts.

```html
<a href="#footnotes" aria-describedby="footnote-label" id="footnotes-ref"
  >methods</a
>

<aside>
  <h2>Footnotes</h2>
  <ol>
    <li id="footnotes">
      This is the footnote about methods
      <a href="#footnotes-ref" aria-label="Back to content">Back</a>
    </li>
  </ol>
</aside>
```

We provide aria-labels for everything and we also add an `aside` at the bottom which is where we put the footers.

Note that you do not need to manually add numbers to the footnotes. This is because we have setup the CSS to dynamically count your footnotes. Having said this, you do need to put them in the correct order in the aside section at the bottom.

### Article Notes

These are marked up as `<asides/>` and used in blog posts to make a clarification inline. When should a clarification be made inline vs. in a footnote? Just ask yourself how important is it to have the additional information highlighting inline. Its subjective.

Also keep in mind that if you use `<aside/>` the text inside will not be parsed correctly so things like backticks or links will not be formatted. To regain formatting, please use

```html
<code class="gatsby-code-text">...</code>

/* or */

<a class="article__link" href="https://pages.github.com/" target=" _blank"
  >...</a
>
```

### Images

- All blog images should live in `pages/blog/images`.
- Please prefix each image with the same 3 digit code as your blog post. For example, if your blog is `001-...` your image name should also begin with `001-image-name-0f-your-choosing`.
- Example of how to reference your images in a blog post

  ```markdown
  ![screenshot of example hello clojurescript site](/001-image-hello-cljs-dev-example.png)
  ```

### Edits

I want to work to keep these posts updated so that they remain relevant. To do this, we should have a consistent system to handle edits/updaes. For example, when we make an update we should do so on a separate branch which follows these naming conventions:

```bash
000-edit-round-1-deploy-clojurescript-to-github-pages
```

> article-id > edit > round # - article name

Each commit should follow a convention like

```bash
000 - blog post - edit - add note about Gotchas
```

> article-id > type > edit - summary of change

Once completed, make a PR. The PR is to deploy a preview.

### Header Links

Linking header github style is a feature we want. However, this will not happen automatically so we require an [additional plugin](https://www.gatsbyjs.org/packages/gatsby-remark-autolink-headers/) to provide this support. Now, whenever we have `H*` level headers they automatically recieve links.

## Updating Blog Posts

Keeping blog posts updated is important because it ensure that the work stays relevant and therefore useful to future readers.  With CLJ(s) this is easier because of the stability of the ecosystem.  Either way though, here is an outline of artifacts that need to be updated:

### ClojureScript Versions

- post - 000 - deploy cljs github
- demo - https://github.com/athomasoriginal/demo-clojurescript-gh-pages
- post - 001 - cljs app from scratch
- post - 003 - cljs tests
- video - 016 - figwheel

### Figwheel Versions

- post - 001 - cljs app from scratch
- post - 003 - cljs tests

### Clojure Survey

- post - 001 - cljs app from scratch

### Create Reagent App Versions

- post - 003 - cljs tests
- post - 005 - deploy cljs nginx

### Atom Editor

- post - 006 - chlorine (e.g. no longer depends on Ink)
- video - https://www.youtube.com/watch?v=mEcOwtRt0f4

## Special Thanks

I appreciate everyone who has helped to improve this blog whenever possible. Shoutouts:

### Design

- [Chelsea Murray](https://www.linkedin.com/in/chelseamurraydesign/)

### Illustrations

- [syungb](https://github.com/syungb)

### Content

- [anantpaatra](https://github.com/anantpaatra/)
- [syungb](https://github.com/syungb)
- [lokeh](https://github.com/Lokeh)
- [skidding](https://github.com/skidding)
- [@henrikeneroth](https://twitter.com/henrikeneroth?lang=en)
- [holyjak](https://github.com/holyjak)
- [rogererens](https://github.com/rogererens)
