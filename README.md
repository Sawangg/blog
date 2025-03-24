# Leo Mercier's blog

My personal blog built to host my articles. Here is a list of the features:

- Minimal dependencies, build output is less than 1MB
- Custom-built auth system, with oauth providers
- Edge network compatible, working with all popular runtimes
- Lighthouse 100% on all metrics on all pages
- A+ on security, with headers, strict CSP & security.txt
- SEO optimization with robots.txt & sitemap
- Perfect accessibility with light and dark modes, with client page transitions
- No vendor lock-in, self-hostable with 100% of the features by changing the deploy commands and Astro adapter (e.g. `@astro/node`)

### Tech stack

<a href="https://astro.build/" title="Astro" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/astro/astro-original.svg" alt="astro" width="35" height="35" /></a>
<a href="https://reactjs.org/" title="ReactJS" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="react" width="35" height="35" /></a>
<a href="https://tailwindcss.com/" title="TailwindCSS" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" alt="tailwindcss" width="35" height="35" /></a>
<a href="https://orm.drizzle.team/" title="DrizzleORM" target="_blank"> <img src="https://images.opencollective.com/drizzle-orm/9405e48/logo/256.png?height=256" alt="DrizzleORM" width="35" height="35" /></a>
<a href="https://www.postgresql.org/" title="PostgreSQL" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" alt="postgresql" width="35" height="35" /></a>

> [!NOTE]
> The runtime needs to have access to the Web Crypto API

#### Development

<a href="https://bun.sh/" title="Bun" target="_blank" align="left"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bun/bun-original.svg" alt="bun" width="35" height="35" /></a>
<a href="https://biomejs.dev/" title="Biome" target="_blank" align="left"> <img src="https://avatars.githubusercontent.com/u/140182603" alt="biome" width="35" height="35" /></a>
<a href="https://www.typescriptlang.org/" title="TypeScript" target="_blank" align="left"> <img src="https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/typescript/typescript-original.svg" alt="typescript" width="35" height="35" /></a>

### TODO

- CI/CD Actions (test, deployment)
- Add headers links
- Add analytics
- Remove React to use web components
- Add SRI

#### Known Issues

- If you're hosting on Cloudflare, you need to disable `Speed Brain`. This features isn't compatible with a strict CSP
and prefetching is already done inside Astro.
- CSP nonce is currently generated in the middleware which defeats the purpose of a strong CSP. There is no alternatives currently in Astro.
- Currently BiomeJS partialy supports Astro files. The component script is linted/formatted but not the template part. See the [documentation](https://biomejs.dev/internals/language-support/#html-super-languages-support)

## References

The custom authentification was inspired by the [Lucia Auth](https://lucia-auth.com/) project.
