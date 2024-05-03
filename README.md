


## Docker

This skelton Docker Development and Production for SvelteKit using `Typescript` if you prefer using `Javascript` you can check this repo
[sveltekit-js-docker](https://github.com/adityadees/sveltekit-js-docker)

### Docker Dev and Prod
- If you run docker dev, this action same like `npm run dev`
- If you run docker prod, this action same like `npm run build`
- for production build will have two image and container (static and node)

  - If you don't have an image run this first
  - this will build a docker image
    - for development mode
      ```make
      make build 
      ```
    - for deployment production mode
      ```make
      make build-prod
      ```

  - (if you already have an image run this or you can just run this if you don't have image, this will automate pull an image depedency)
  - this will run the container
    - for development mode
      ```make
      make up 
      ```
    - for deployment production mode
      ```make
      make up-prod
      ```

  - run this if you want to stop the container
    - for development mode
      ```make
      make stop
      ```
    - for deployment production mode
      ```make
      make stop-prod
      ```

  - run this if you want to delete the container
    - for development mode
      ```make
      make down
      ```
    - for deployment production mode
      ```make
      make down-prod
      ```

### note

make sure you know about the port

rules : example `5001:5173`

Left is your port

Right is port inside docker

For docker port I used default port

```
5173 : default vite port
80 : default nginx port
3000 : default node port
```

you can config port for yourself

example :
if you want to change vite port 
you can change this line `"dev": "vite dev --host"` inside  `package.json` to `"dev": "vite dev --host 0.0.0.0 --port 5005"` and don't forget to change others `5173` to `5005`


------------


# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

