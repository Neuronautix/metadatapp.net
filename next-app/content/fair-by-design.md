---
title: "FAIR-by-Design"
layout: "page"
slug: "/fair-by-design"
showInNav: true
navOrder: 22
navGroup: "Learn"
hero:
  title: "FAIR-by-Design approach"
  subtitle: "Maximize scientific insight while minimizing animal use by making every asset findable, accessible, interoperable, and reusable."
sections:
  - type: "featureCards2Col"
    title: "FAIR pillars in practice"
    cards:
      - title: "Findable"
        body: |
          **F1. Globally unique, persistent identifiers**  
          - HTTP URI per entity (e.g., https://api.ontaya.com/v2/Experiment/{id}) with content negotiation.  
          - Relay-style `id: ID!` as persistent key; DOIs/ARKs for published datasets.  
          **F2. Rich metadata descriptions**  
          - Keywords, abstract, methods + JSON-LD contexts for harvesting.  
          **F3. Metadata includes data identifiers**  
          - Embed `@id` in JSON-LD and return `id` prominently in GraphQL payloads.  
          **F4. Indexed, searchable resources**  
          - Elastic/Solr index, faceted search, `/search` REST alongside GraphQL.
      - title: "Accessible"
        body: |
          **A1. Retrievability via standard protocol**  
          - HTTPS REST + GraphQL; JSON and JSON-LD via `Accept` negotiation.  
          **A1.1. Open, free protocols**  
          - HTTP(S)/GraphQL, documented via OpenAPI/introspection.  
          **A1.2. Auth where necessary**  
          - OAuth2/JWT scopes (Keycloak/Auth0), Symfony security; public metadata when possible.  
          **A2. Metadata persistence**  
          - Retain metadata even if raw data is archived; expose status/provenance.
      - title: "Interoperable"
        body: |
          **I1. Formal, shared language**  
          - JSON-LD context/RDF schema mapping GraphQL types to Schema.org/OBO; SPARQL for federation.  
          **I2. Community vocabularies**  
          - NCBI Taxonomy, EDAM, OBO terms; validate on ingestion.  
          **I3. Qualified references**  
          - Resolvable URIs with relation metadata; GraphQL edges with `cursor` + `node.id`; relation types in JSON-LD.
      - title: "Reusable"
        body: |
          **R1. Rich description**  
          - Provenance (`createdBy/At`, `modifiedBy/At`), license, usage notes; domain fields (dose, protocol, environment).  
          **R1.1. License**  
          - Top-level license (CC0/CC-BY) exposed machine-readably; UI license picker.  
          **R1.2. Detailed provenance**  
          - Auto-track “who did what when” via triggers/events; expose `provenance` subtype in GraphQL.  
          **R1.3. Community standards**  
          - Validate against ARRIVE/MIAME/other schemas at ingestion; UI templates enforce required fields.
  - type: "ctaBanner"
    title: "Need a FAIR plan?"
    body: "See how MAAP implements FAIR in practice and how it supports the 3Rs."
    cta:
      label: "Talk to us"
      href: "/contact"
---
