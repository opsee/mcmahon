---
layout: post
title: Building and Shipping at Ludicrous Speed
category: general
author: greg_poirier
excerpt:  After five months and an ever-increasing number of projects, it's time to standardize build processes. We were using various combinations of Make and Bash to cobble things together, and it "worked" so far, but when we started having difficult-to-diagnose issues with the build for one of our main Go projects, we decided to take a step back.
cover: /public/img/blog/yodawg.jpg
cover-alt: I HEARD YOU LIKE CONTAINERS SO WE BUILT A CONTAINER TO BUILD OUR CONTAINERS

---

After five months and an ever-increasing number of projects, it's time to
standardize build processes. We were using various combinations of Make and
Bash to cobble things together, and it "worked", but when we started having
difficult-to-diagnose issues with the build for one of our main Go projects, we
decided to take a step back.

## Meager Beginnings

The heart of monitoring at Opsee is the Bastion Instance.  It drives our
ability to discover services, monitor their health and latency, and remote
control AWS for you. It started out as a monolith, but was quickly broken apart
into a collection of microservices which reside in a common Go project. Along
with that project are a supervisor (systemd) and a message bus (NSQ). A single
Docker image contains all of the compiled code and each service is spawned in
an individual container.

Given the heavy investment in microservices and containers, we realized we
would need to be extremely good at building Go and shipping containers.  We had
done both for a while, but the process became brittle and unstable. We chose
Docker for the ability to have a single build pipeline, and we weren't doing
that. The method you use to build your development container on your laptop
should yield a runtime environment identical to the one in production.  There
should be no guessing about it.

The goal is such that when you're under pressure, and you have to diagnose a
production issue without touching production, you can stand up an entire
environment identical to it on your laptop in seconds.

## Build in Containers

We started out using godeps. It worked for a while, but its interaction with
GOPATH made things difficult. We switched to using [gb](https://getgb.io/) for
dependency management, and everything in our lives suddenly resonated in
perfect harmony.  No really. It was that kind of a change. We're looking
forward to the vendoring experiment in Go 1.5, but we had a system that worked.
Now, we needed to make it work consistently.

> The method you use to build your development container on your laptop should yield a runtime environment identical to the one in production.

As one does when starting with containers, we had no standardization. Every
project had its own hand-crafted Dockerfile with who-knows-what ending up in
the containers being run in production. This had to stop, obviously. First, we
made some choices.

### Do not ship a build environment in production containers.

This means having a separate build container and a container that houses your
runtime environment and application. In order to both do this well and easily
onboard new employees into The Truth and The Way, we would need a standardized
build container that allowed for project-specific build adjustments. Out of this
desire came three Docker images:

* [build-base](https://github.com/opsee/build-base)
* [build-go](https://github.com/opsee/build-go)
* [build-clj](https://github.com/opsee/build-clj)

Getting there required some initial constraints to be placed on our
Go and Clojure projects. We are okay with those constraints, for now,
because it means building a project is as simple as running a container
with your source in a Docker volume.

```
docker run -v `pwd`:/build quay.io/opsee/go-build
```

That's all it takes. It also means that our Go projects will compile with only
a simple ```gb build```. So if we want to run them directly on our laptops,
outside of the standardized runtime environment, we can.

It took us a few iterations to get there, but we managed it eventually.

### Minimize the size of containers shipped to production.

We wanted to minimize the size of our deployables, but also wanted to allow for
some initial flexibility (e.g. being able to install a shell and inspect the
container contents if we must). For this, we chose Gliderlabs’ Alpine image.
The base image is only 5MB, and that with our statically-linked Go binaries
means about a 50MB container. It could be smaller, but like I said: we wanted
some initial flexibility.  Keeping the image small means we keep our S3 storage
and inter-region transfer costs down. Hooray!

After we compile in the build-go container, we then import the resulting
compiled code into our runtime container--all of which begin with "FROM
[gliderlabs/alpine](https://github.com/gliderlabs/docker-alpine)". Once we
get really good at running these things in production, we're considering
moving to a different base image that only includes those things absolutely
necessary for a particular runtime.

### Docker builds must be fast (on the order of seconds).

Our initial concerns with Docker were slow builds. The last thing we wanted to
do was foment rebellion in new developers by having their builds take a long
time. What this generally means is that both tests and docker run must execute
quickly. Achieving this is part development methodology, which we won't discuss
here (but may eventually), and part Dockerfile/container optimization.

First, do not build your build container when you're building your application.
Doing so will dramatically increase the build time. Instead, automate updates
to your build container. The end goal is to use CircleCI to auomate our
container build process instead of using git push notifications to our
respitories on [Quay.io](https://quay.io/). This is specifically so that we can
tag every we build with a Git rev-hash or a nightly build timestamp. Doing so
allows us to strictly version all components of a release. For now, we're just
using git push notifications.

Since the heavy lifting happens in CI, we end up with local build times around
10 seconds and 2-minute CI jobs. In the end, you can literally have a new
microservice up and running in production in just a few minutes. All services
must go through CI.

## So Far, So Good

Getting to this point has involved a considerable amount of learning, trial and
error, and failure. Our process continues to evolve, and we continue to learn.
The nice part about our technological choices is that every single component is
easy to remove and replace with something else when it's shown to no longer be
viable. Personally, this is my first time as the first hire at a startup--and
this methodology has proven to be invaluable.

If this sounds exciting to you, well, <a href="/#hiring-positions">we're hiring</a>.

