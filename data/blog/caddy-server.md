---
title: 'SSL Configuration for Your Domain Using Caddy Server Reverse-Proxy: A Step-by-Step Guide'
date: '2023-07-30'
tags: ['how-to', 'tools', 'cloud-security']
draft: false
summary: Tutorial on how can you configure an SSL encryption on your domain/subdomain
layout: PostLayout
---

## TL;DR

If you want to get free SSL Encryption on your domain, [Caddy Server](https://caddyserver.com/) is the way to go. You can configure a Reverse-Proxy for your domain using Caddy in order to get an SSL encryption.

---

## Prerequisites

In order to start working on getting a SSL Encryption configured, make sure you have these in place:

- A domain configured for your Cloud Instance ([Namecheap](https://www.namecheap.com/), [GoDaddy](https://www.godaddy.com/))
- Cloud Instance accessible through SSH in order for you to connect to it and perform the next steps.
- If you're using Oracle Cloud as a Provider, make sure you configure a port forward for 443 for your instance

---

## Installing Caddy Server

The installation process can be done in 2 ways. You can either directly download Caddy from the official website or you can install it using Package Managers on Linux.

1. For the first way, you have the following options:
   You'll need to select your kernel type and download the software and that's IT!

![Caddy-Download](/static/images/caddy-download.png)

2. For the second way, you'll need to run a few commands

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
```

```bash
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
```

```bash
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
```

```bash
sudo apt update && sudo apt install caddy
```

And finally, you can execute `caddy` command on your Linux machine. You should see something like this:

```bash
ubuntu@instance-adrianfuro:~$ caddy
Caddy is an extensible server platform written in Go.

At its core, Caddy merely manages configuration. Modules are plugged
in statically at compile-time to provide useful functionality. Caddy's
standard distribution includes common modules to serve HTTP, TLS,
and PKI applications, including the automation of certificates.

To run Caddy, use:

        - 'caddy run' to run Caddy in the foreground (recommended).
        - 'caddy start' to start Caddy in the background; only do this
          if you will be keeping the terminal window open until you run
          'caddy stop' to close the server.

When Caddy is started, it opens a locally-bound administrative socket
to which configuration can be POSTed via a restful HTTP API (see
https://caddyserver.com/docs/api).

Caddy's native configuration format is JSON. However, config adapters
can be used to convert other config formats to JSON when Caddy receives
its configuration. The Caddyfile is a built-in config adapter that is
popular for hand-written configurations due to its straightforward
syntax (see https://caddyserver.com/docs/caddyfile). Many third-party
adapters are available (see https://caddyserver.com/docs/config-adapters).
Use 'caddy adapt' to see how a config translates to JSON.

For convenience, the CLI can act as an HTTP client to give Caddy its
initial configuration for you. If a file named Caddyfile is in the
current working directory, it will do this automatically. Otherwise,
you can use the --config flag to specify the path to a config file.

Some special-purpose subcommands build and load a configuration file
for you directly from command line input; for example:

        - caddy file-server
        - caddy reverse-proxy
        - caddy respond

These commands disable the administration endpoint because their
configuration is specified solely on the command line.

In general, the most common way to run Caddy is simply:

        $ caddy run

Or, with a configuration file:

        $ caddy run --config caddy.json

If running interactively in a terminal, running Caddy in the
background may be more convenient:

        $ caddy start
        ...
        $ caddy stop

This allows you to run other commands while Caddy stays running.
Be sure to stop Caddy before you close the terminal!

Depending on the system, Caddy may need permission to bind to low
ports. One way to do this on Linux is to use setcap:

        $ sudo setcap cap_net_bind_service=+ep $(which caddy)

Remember to run that command again after replacing the binary.

See the Caddy website for tutorials, configuration structure,
syntax, and module documentation: https://caddyserver.com/docs/

Custom Caddy builds are available on the Caddy download page at:
https://caddyserver.com/download

The xcaddy command can be used to build Caddy from source with or
without additional plugins: https://github.com/caddyserver/xcaddy

Where possible, Caddy should be installed using officially-supported
package installers: https://caddyserver.com/docs/install

Instructions for running Caddy in production are also available:
https://caddyserver.com/docs/running

Usage:
  caddy [command]

Examples:
  $ caddy run
  $ caddy run --config caddy.json
  $ caddy reload --config caddy.json
  $ caddy stop

Available Commands:
  adapt          Adapts a configuration to Caddy's native JSON
  add-package    Adds Caddy packages (EXPERIMENTAL)
  build-info     Prints information about this build
  completion     Generate completion script
  environ        Prints the environment
  file-server    Spins up a production-ready file server
  fmt            Formats a Caddyfile
  hash-password  Hashes a password and writes base64
  help           Help about any command
  list-modules   Lists the installed Caddy modules
  manpage        Generates the manual pages for Caddy commands
  reload         Changes the config of the running Caddy instance
  remove-package Removes Caddy packages (EXPERIMENTAL)
  respond        Simple, hard-coded HTTP responses for development and testing
  reverse-proxy  A quick and production-ready reverse proxy
  run            Starts the Caddy process and blocks indefinitely
  start          Starts the Caddy process in the background and then returns
  stop           Gracefully stops a started Caddy process
  trust          Installs a CA certificate into local trust stores
  untrust        Untrusts a locally-trusted CA certificate
  upgrade        Upgrade Caddy (EXPERIMENTAL)
  validate       Tests whether a configuration file is valid
  version        Prints the version

Flags:
  -h, --help   help for caddy

Use "caddy [command] --help" for more information about a command.

Full documentation is available at:
https://caddyserver.com/docs/command-line
```

---

## What is Reverse Proxy?

A reverse proxy is a server that sits in front of one or more web servers, intercepting requests from clients. This is different from a forward proxy, where the proxy sits in front of the clients. With a reverse proxy, when clients send requests to the origin server of a website, those requests are intercepted at the network edge by the reverse proxy server. The reverse proxy server will then send requests to and receive responses from the origin server.

The difference between a forward and reverse proxy is subtle but important. A simplified way to sum it up would be to say that a forward proxy sits in front of a client and ensures that no origin server ever communicates directly with that specific client. On the other hand, a reverse proxy sits in front of an origin server and ensures that no client ever communicates directly with that origin server.

Let’s illustrate by naming the computers involved:

- **D**: Any number of users’ home computers
- **E**: This is a reverse proxy server
- **F**: One or more origin servers

![reverse-proxy](/static/images/reverse-proxy.png)

---

## Caddy Reverse Proxy

Setting up a Reverse Proxy is not that hard with Caddy. There are 2 ways you can create a Reverse Proxy with this amazing tool:

1.  Using command line:
    `bash sudo caddy reverse-proxy --from yourdomain.com --to localhost:port `

2.  Using Caddyfile: - When using Caddyfile to configure your reverse proxy, you'll need to create the file itself first `touch Caddyfile`
    After creating the Caddyfile add these lines and change them accordingly as would you configuration will look like.
    ```json
    yourdomain.com {
    reverse_proxy localhost:port
    }

            subdomain.yourdomain.com {
                    reverse_proxy localhost:port
            }
            ```


            ```bash
            sudo caddy adapt
            ```
            ```bash
            sudo caddy run
            ```

- When using either of the methods and running caddy, it should look a bit like this and you should be able to access your web-app through the domain/subdomain:

        ```bash
        2023/08/01 14:59:57.221 WARN    admin   admin endpoint disabled
        2023/08/01 14:59:57.222 INFO    http    server is listening only on the HTTPS port but has no TLS connection policies; adding one to enable TLS      {"server_name": "proxy", "https_port": 443}
        2023/08/01 14:59:57.222 INFO    http    enabling automatic HTTP->HTTPS redirects        {"server_name": "proxy"}
        2023/08/01 14:59:57.222 INFO    tls.cache.maintenance   started background certificate maintenance  {"cache": "0x40004ed2d0"}
        2023/08/01 14:59:57.222 INFO    tls     cleaning storage unit   {"description": "FileStorage:/root/.local/share/caddy"}
        2023/08/01 14:59:57.222 INFO    http.log        server running  {"name": "remaining_auto_https_redirects", "protocols": ["h1", "h2", "h3"]}
        2023/08/01 14:59:57.222 INFO    http    enabling HTTP/3 listener        {"addr": ":443"}
        2023/08/01 14:59:57.222 INFO    failed to sufficiently increase receive buffer size (was: 208 kiB, wanted: 2048 kiB, got: 416 kiB). See https://github.com/quic-go/quic-go/wiki/UDP-Receive-Buffer-Size for details.
        2023/08/01 14:59:57.223 INFO    http.log        server running  {"name": "proxy", "protocols": ["h1", "h2", "h3"]}
        2023/08/01 14:59:57.223 INFO    http    enabling automatic TLS certificate management   {"domains": ["plausible.adrianfuro.com"]}
        2023/08/01 14:59:57.223 INFO    tls     finished cleaning storage units
        Caddy proxying https://plausible.adrianfuro.com -> localhost:8000
        ```

---

## Conclusion

In conclusion, the Caddy Server offers a straightforward and efficient method to configure SSL encryption on your domain/subdomain. By setting up a reverse-proxy, not only are you adding an additional layer of security, but you're also ensuring that client and server communications are streamlined and seamlessly managed. The installation process of Caddy Server is simple and can be achieved through direct download or package managers on Linux. With the Caddy Server, you can leverage the command line or use a Caddyfile to set up your reverse proxy. This tutorial provides a practical guide to help you through the process, ensuring that your domain/subdomain is well-secured and efficiently managed.
