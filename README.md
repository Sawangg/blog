# Leo Mercier's blog

My personal blog built to host my articles.

### Features

- OAuth authentification
- Edge network compatible
- Lighthouse 100% on all metrics
- A+ on security with headers, Strict CSP & security.txt
- SEO optimization with robots.txt & sitemap

### Tech stack

<a href="https://bun.sh/" title="Bun" target="_blank" align="left"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bun/bun-original.svg" alt="bun" width="35" height="35" /></a>
<a href="https://astro.build/" title="Astro" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/astro/astro-original.svg" alt="astro" width="35" height="35" /></a>
<a href="https://reactjs.org/" title="ReactJS" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="react" width="35" height="35" /></a>
<a href="https://tailwindcss.com/" title="TailwindCSS" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" alt="tailwindcss" width="35" height="35" /></a>
<a href="https://orm.drizzle.team/" title="DrizzleORM" target="_blank"> <img src="https://images.opencollective.com/drizzle-orm/9405e48/logo/256.png?height=256" alt="DrizzleORM" width="35" height="35" /></a>
<a href="https://lucia-auth.com/" title="Lucia" target="_blank"> <img src="https://avatars.githubusercontent.com/u/124423533?s=200&v=4" alt="lucia" width="35" height="35" /></a>
<a href="https://www.postgresql.org/" title="PostgreSQL" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" alt="postgresql" width="35" height="35" /></a>

#### Known Issues

- If you're hosting on Cloudflare, you need to disable `Speed Brain`. This features isn't compatible with a strict CSP
and prefetching is already done inside Astro.
- CSP nonce is currently generated in the middleware which defeats the purpose of a strong CSP. There is no alternatives currently in Astro.
- drizzle-kit studio is not working (cause: astro:env)
- Some environment variables should have their access restricted to secret instead of public

