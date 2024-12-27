---
title: "Creating the next generation UI"
description: "I created HeraUI, a next gen component library"
author: "Léo Mercier"
authorLink: "https://github.com/Sawangg"
authorAvatar: "https://avatars.githubusercontent.com/u/38500427?s=60"
authorAt: "@Sawangg"
publishedAt: 2024-04-03
tags: 
- title: Web
  color: purple
- title: Design
  color: green
---
import { Button } from "../../ui/Button.tsx";
import { Heading } from "../../ui/Heading.tsx"; 
import { Input } from "../../ui/Input.tsx";

After adding `shadcn/ui` in my workflow, I wanted to use it everywhere. Having a nice looking component fully accessible on every web platform (and that's a LOT) is undoubtedly a game changer in interface creation. With this revolution in mind and the announcement of `react-aria-components`, I wanted to create my own UI library based on it for a few of my own projects. And you're looking right at the result! This blog was created using HeraUI for all of its interface.
<br />
After sketching a few ideas, I dived in the code and created 16 common components found in any UI. Here is a preview
<br/>
<Button color="blue" client:visible>Click me</Button>
<br />
<br />
<Heading>A title</Heading>
<Heading level={2}>Subtitle</Heading>
<Heading level={3}>A small title</Heading>
<br />
<Input placeholder="This is a placeholder" />
<br />
And much more!
<br/>
You can find the library [on my github](https://github.com/Sawangg/heraUI). Hera is currently in its early stages and will continue to evolve in the future, mainly by adding a CLI and new components! Keep an eye out for it!
