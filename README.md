# Angular Micro Frontend Example

This repository shows you how to set up micro frontends using Webpack 5 and Module Federation plugin in Angular and share authenticated state across the project. Please read [How to Build Micro Frontends Using Module Federation in Angular][blog] to see how it was created.

This repo accompanies the posts for the Angular micro-frontend series. The starter project is in the `main` branch. The completed code for the first post is in the `local` branch.

**Prerequisites**

* Node 16
* Okta CLI
* Angular CLI
* GitHub account
* Vercel account

> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage and secure users and roles in any application.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To run this example, run the following commands:

```bash
git clone https://github.com/oktadev/okta-angular-microfrontend-example.git
cd okta-angular-microfrontend-example
npm ci
```

### Create an OIDC Application in Okta

Create a free developer account with the following command using the [Okta CLI](https://cli.okta.com):

```shell
okta register
```

If you already have a developer account, use `okta login` to integrate it with the Okta CLI.

Provide the required information. Once you register, create a client application in Okta with the following command:

```shell
okta apps create
```

You will be prompted to select the following options:
- Type of Application: **2: SPA**
- Redirect URI: `http://localhost:4200/login/callback`
- Logout Redirect URI: `http://localhost:4200`

The application configuration will be printed to your screen:

```shell
Okta application configuration:
Issuer:    https://<OKTA_DOMAIN>.okta.com/oauth2/default
Client ID: <CLIENT_ID>
```

In Okta dashboard, navigate to **Directory** > **People** and populate "department" field for your user with either a `1` or `2`. Navigate to **Security** > **API** and add "department" custom claim to your application Authorization Server ID token by mapping it to `user.profile.department`. The tutorial walks you through this process.

Update `projects/shell/src/app/app.module.ts` with your Okta settings.

```ts
const oktaAuth = new OktaAuth({
    clientId: '{yourClientID}',
    issuer: 'https://{yourOktaDomain}/oauth2/default',
    redirectUri: window.location.origin + '/login/callback'
});
```

Start the app by running

```shell
npm run run:all
```

### Recreate this starter

You can recreate this starter project structure yourself. Here are the central Angular CLI, npm, and shell commands. The commands to add Tailwind CSS and each Angular component is skipped.

```shell
npx @angular/cli@13 new okta-angular-microfrontend-example --create-application false --minimal
cd okta-angular-microfrontend-example
ng generate application shell --routing --style css --inline-style
ng generate component products --project shell
ng generate component products/product --project shell --flat
ng generate library shared
ng generate interface product --project shared
ng generate service products --project shared
ng generate service basket --project shared

ng generate application mfe-basket --routing --style css --inline-style
ng generate component home --project mfe-basket
ng generate module basket --project mfe-basket --routing --route basket --module app

ng add @angular-architects/module-federation --project shell --port 4200
ng add @angular-architects/module-federation --project mfe-basket --port 4201
```

## Links

This example uses the following open source libraries from Okta:

* [Okta Angular SDK](https://github.com/okta/okta-angular)
* [Okta CLI](https://github.com/okta/okta-cli)

## Help

Please post any questions as comments on the [blog post][blog], or visit our [Okta Developer Forums](https://devforum.okta.com/).

## License

Apache 2.0, see [LICENSE](LICENSE).

[blog]: https://developer.okta.com/blog/2022/05/17/angular-microfrontend-auth
