---
layout: post
title: Announcing Private Beta
category: general
author: cliff_moon
excerpt:  It's my pleasure to announce the start of Opsee's private beta. What is Opsee? Opsee is a turnkey and elastic (like AWS) application monitoring system designed to work entirely from your phone.
cover: /public/img/blog/private-beta.png
cover-alt: Private beta logo with badge

---

It's my pleasure to announce the start of Opsee's private beta. What is Opsee? Opsee is a turnkey and elastic (like AWS) application monitoring system designed to work entirely from your phone. Opsee was built with developers in mind to help them monitor and fix their production applications as quickly as possible&mdash;so they can stop fighting fires and get back to shipping features. Here's a demo:

<iframe src="https://player.vimeo.com/video/140711940?color=ff9933&title=0&byline=0&portrait=0" width="100%" height="240" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<br/>

## Why Opsee?

To answer that question, let's time travel back to my last company, Boundary. While I was at Boundary, I spent a lot of my time talking to customers, and I noticed some themes in the monitoring market. Very few customers were fully sastisfied with their monitoring setup. The SaaS providers who managed to stay in business were homogenizing into dashboards and metrics storage, and while a lot of lip service gets paid to whiz bang features like "smart" alerting, machine learning, and anomaly detection, in practice most of these techniques failed to deliver consistently actionable alerts. If a computer wakes you up at 3 in the morning, it needs a much better reason to do so than the appearance of an inscrutable aberration on a graph. So despite the explosion of SaaS offerings, I found that most customers were doing their front-line alerting with Nagios, an open source tool nearly two decades old.

I realized that this is a blind spot in the market. Monitoring companies get started by systems engineers with great technical accumen and an itch to solve hard problems, and they invariably go about solving the hardest problems that they faced building monitoring at Facebook, Twitter, or Google. It turns out that most people simply don't have problems at that scale, therefore these teams inevitably get acquihired or go out of business. Meanwhile, monitoring keeps sucking for the vast majority of developers who are increasingly being asked to bear the burden of an on-call rotation.

Opsee is here to make monitoring simple for developers and take away the pain of being on call. If you want to try us out during private beta, [please signup](https://app.opsee.com/start) and take our survey.

