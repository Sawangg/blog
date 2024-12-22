# Leo Mercier's blog

My personal blog built to host my articles.

### Features

- OAuth authentification
- Edge network compatible
- Lighthouse 100% on all metrics
- A+ on security with headers, strict CSP & security.txt
- SEO optimization with robots.txt & sitemap
- Perfect accessibility with light and dark modes
- No vendor lock-in, self-hostable by changing the the deploy commands and to another adapter (e.g. `@astro/node`)

### Tech stack

<a href="https://bun.sh/" title="Bun" target="_blank" align="left"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bun/bun-original.svg" alt="bun" width="35" height="35" /></a>
<a href="https://astro.build/" title="Astro" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/astro/astro-original.svg" alt="astro" width="35" height="35" /></a>
<a href="https://reactjs.org/" title="ReactJS" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="react" width="35" height="35" /></a>
<a href="https://tailwindcss.com/" title="TailwindCSS" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" alt="tailwindcss" width="35" height="35" /></a>
<a href="https://orm.drizzle.team/" title="DrizzleORM" target="_blank"> <img src="https://images.opencollective.com/drizzle-orm/9405e48/logo/256.png?height=256" alt="DrizzleORM" width="35" height="35" /></a>
<a href="https://lucia-auth.com/" title="Lucia" target="_blank"> <img src="https://avatars.githubusercontent.com/u/124423533?s=200&v=4" alt="lucia" width="35" height="35" /></a>
<a href="https://www.postgresql.org/" title="PostgreSQL" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" alt="postgresql" width="35" height="35" /></a>

### TODO

- Move from deprecated Lucia to rolling own auth
- Move from mdx to md
- Better codeblocks (filenames and theme support)
- CI/CD Actions (test, deployment to preview)
- Fix db:studio
- Add headers linker and summary on the left of the page
- Move from tailwind v3 to v4
- Remove React to use web components

#### Known Issues

- If you're hosting on Cloudflare, you need to disable `Speed Brain`. This features isn't compatible with a strict CSP
and prefetching is already done inside Astro.
- CSP nonce is currently generated in the middleware which defeats the purpose of a strong CSP. There is no alternatives currently in Astro.
- Some environment variables should have their access restricted to secret instead of public in `astro.config.ts`. Currently, I can't make secrets work using Cloudflare. This is not critical (if you share the build output with someone, they could potentially extract your secrets).

