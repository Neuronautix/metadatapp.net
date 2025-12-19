---
title: "Details"
layout: "page"
slug: "/mapp-description"
showInNav: true
navOrder: 1
navGroup: "Product"
hero:
  title: "A next-generation platform for reliable and efficient preclinical research"
  subtitle: |
    MAAP from Ontaya solves one of the biggest bottlenecks in preclinical R&D: scattered, inconsistent, and poorly reusable metadata. MAAP provides a unified, API-first environment where all experimental metadata are captured in a structured, standardized, and interoperable way.
  backgroundImage: "/images/hero-lab.jpg"
  primaryCta: { label: "Explore features", href: "#features" }
  secondaryCta: { label: "Book a call", href: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ21V13yqbecGws7t9tjkScNOi2zUW07JGpk7TvwV8Avbjdz3663yJCZXoB4Dtcc69CoJzhgSM9T?gv=true" }
sections:
  - type: "featureCards"
    title: "Core features"
    cards:
      - title: "Ontology‑driven metadata"
        body: "Capture experiments with validated schemas (JSON‑LD + SHACL). Align with Mouse Behavior Ontology (MBO), SEND‑JSON, and lab SOPs for semantic consistency."
      - title: "API Platform backend"
        body: "Symfony/API Platform with GraphQL & REST. Auth via Keycloak (OIDC). Postgres storage. Exports to CSV, JSON, JSON‑LD, RO-CRATE, and NWB."
      - title: "Compliance & ethics"
        body: "Built-in 3Rs alignment, ARRIVE guidelines, and audit trails. Export for regulatory submissions and ethical reviews."
      - title: "React admin UI"
        body: "Fast data entry with smart forms: required fields, controlled vocabularies, date pickers, and data validators."
      - title: "ML‑ready data"
        body: "Clean, structured datasets with clear labels and metadata context for downstream analytics, anomaly detection, and model training."
      - title: "HCM integration"
        body: "(coming soon) Plug in DVC, LMT, iMouse and other systems. Normalize outputs into comparable behavioral metrics with provenance and versioning."
  - type: "featureCards2Col"
    title: "Who benefits?"
    cards:
      - title: "Platform teams"
        body: "Interoperable JSON‑LD contexts; RBAC, audit logs, and one‑click exports."
      - title: "Labs"
        body: "Templates for common protocols, collaboration without spreadsheets, and 3Rs traceability."
      - title: "CROs"
        body: "Standardized intake/outputs, productized data packages, and defensible SLAs."
  - type: "textSection"
    title: "Technical Architecture"
    body: |
      **Backend Stack**  
      - Symfony 6+ with API Platform  
      - PostgreSQL  
      - Keycloak for authentication  
      - Docker & Kubernetes deployment  
      - GraphQL & REST APIs  

      **Frontend Stack**  
      - React 18 with TypeScript  
      - Tailwind CSS for styling  
      - React Query for data fetching  
      - Form validation with Zod  
      - Responsive design
  - type: "featureCards"
    title: "Seamless Integrations"
    cards:
      - title: "LIMS/AMS Systems"
        body: "Connect with laboratory and colony management systems for automated data flow."
      - title: "Electronic Lab Notebooks"
        body: "Integrate with ELNs to capture experimental procedures and observations."
      - title: "Animal Management"
        body: "Connect with systems for comprehensive animal tracking."
      - title: "ORCID / ROR"
        body: "Use your unique identifiers."
      - title: "Regulatory Interfaces"
        body: "Research data management and specific animal reporting."
      - title: "Customize your MAAP!"
        body: "Tailored to your ecosystem and data formats."
  - type: "featureCards2Col"
    title: "Standards & Compliance"
    cards:
      - title: "FAIR Principles"
        body: "- Findable: rich metadata/search\n- Accessible: open protocols/auth\n- Interoperable: JSON-LD and standard schemas\n- Reusable: provenance and versioning. Learn more in <a href=\"/fair-by-design\">FAIR-by-Design</a>."
      - title: "3Rs Alignment"
        body: "- Reduction: optimize design\n- Refinement: improve welfare\n- Replacement: support alternatives\n- Ethical oversight and compliance"
      - title: "FAIRRR"
        body: "Any instance managed through MAAP will be FAIR and thus 3Rs aligned; data choices translate to welfare decisions."
  - type: "ctaBanner"
    title: "Ready to Transform Your Research?"
    body: "Join the growing community of researchers who are making their data FAIR, reproducible, and impactful."
    cta:
      label: "Try the Demo"
      href: "/demo"
---
