---
tags:
- analytics
- work in public
title: Using Umami with Clickhouse
description: The forbidden documentation
---

I've recently been given an excellent problem to have: my website is popular enough that Postgres doesn't scale. That's fine, Postgres isn't an OLAP. Attempting to use it as one was an objectively awful idea.

![[Pasted image 20240401090358.png]]

Umami has a cloud offering, and they also discovered this problem. They added support for clickhouse, but don't want to share how to use it.

![[Pasted image 20240401015610.png]]
(this is about $200 more than I pay for my server)

That's ok, I figured it out for you!

```
┌─────────────┐     ┌─────┐                
│User Sessions├────▶│Redis│                
└─────────────┘     └─────┘                
┌─────────────┐     ┌─────┐    ┌──────────┐
│   Events    ├────▶│Kafka├───▶│Clickhouse│
└─────────────┘     └─────┘    └──────────┘
┌─────────────┐                      ▲     
│ Other Data  │◀─────────────────────┘     
└─────────────┘                            
```

Two questions I'm unclear on:

1. Can I get away without redis?
2. Is postgres still needed?

But anyway, `scripts/check-env.ts` gives us some insight:

```ts
if (process.env.CLICKHOUSE_URL) {
	checkMissing(['KAFKA_BROKER', 'KAFKA_URL', 'REDIS_URL']);
}
```

## Redis

I added the following to my docker-compose:

```yml
  cache:
    image: redis:6.2-alpine
    restart: always
      #ports:
      #  - '6379:6379'
    command: redis-server --save 20 1 --loglevel warning --requirepass <censored>
    volumes:
      - umami-cache:/data
```

with an env like `redis://:<censored>@cache:6379/0`
## Kafka

I used the following docker images:

```yml
  kafka:
    image: bitnami/kafka
    restart: always
    volumes:
      - umami-kafka:/bitnami/kafka
    environment:
      - KAFKA_CFG_NODE_ID=0
      - KAFKA_CFG_PROCESS_ROLES=controller,broker
      - KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT
      - KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=0@kafka:9093
      - KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER
```

with

```
KAFKA_URL=kafka:9092
KAFKA_BROKER=kafka:9092
```

## Clickhouse

I used the following docker images: 