# HMIS Data Integration

This file is here to talk about the implementation of HMIS Data structures into the Ellis App. This will not be a step by step integration, but rather a breakdown of data structures within HMIS.

## Documentation Links

The information in this file is being derived from the HMIS documentation provided below:

- If you do not know certain terms within this documentation refer to this document:
  - [FY 2024 HMIS Data Standards Manual](https://files.hudexchange.info/resources/documents/HMIS-Data-Standards-Manual-2024.pdf "2024 Data Standards Manual")
- If there are data structure related question refer to this document:
  - [FY 2024 HMIS Data Dictionary – Version 1.6](https://files.hudexchange.info/resources/documents/HMIS-Data-Dictionary-2024.pdf "2024 Data Dictionary")

## HMIS Data Standards

### What are HMIS Data Standards?

> A Homeless Management Information System (HMIS) is the information system designated by a
> local Continuum of Care (CoC) to comply with the requirements of CoC Program interim rule 24
> CFR 578. It is a locally implemented data system used to record and analyze client, service,
> and housing data for individuals and families who are experiencing homelessness or at-risk of
> homelessness.

It's pretty much a way for the U.S. Department of Housing and Urban Development (HUD) to gather information on individuals who are experiencing homelessness.

---

### Defining terms:

There are two terms that are using in data structures, **projects** and **programs**. There is a difference between the two and should be referred to them as what they are.

1. An additional a term I use is **organization** which refers to any of the institutions that are working with the Ellis App. 

1. A **project** is referred to a specific service that an organization provides.

1. A **program** is the federal funding source the organization works with.

> Project and Program are terms used to mean different things across the federal agencies. In
> this document, and for the purposes of data collection in HMIS, a program refers to the federal
> funding source (e.g., HUD CoC, HHS PATH, VA SSVF, etc.) whereas a project refers to a
> distinct unit of an organization as set up in the HMIS (e.g., Rapid Re-Housing).

Data is set up in an HMIS throught projects. Each project contains different data structures and compenents. The data differs for many reasons, federal program relations, privacy reason, and/or if an organization wants to add additional data components.


---

### Which projects need HMIS integration?

> It is used by all projects
> that target services to persons experiencing homelessness within Office of Special
> Needs Assistance Programs (SNAPS) and the office of HIV-AIDS Housing. It is also used by other federal partners from the U.S. Department of Health and
> Human Services (HHS) and the U.S. Department of Veterans Affairs (VA) and their respective
> programs to measure project performance and participate in benchmarking of the national effort
> to end homelessness

Any organization that is working with these offices must have HMIS integration.

---

### What data is not allowed in a project?

Certain pieces of data must be **removed** from an HMIS, but that information must still be sent a different way to HUD.

#### VSP Data:

> Victim Service Providers (VSP) are prohibited from recording survivor information in an HMIS... Instead VSPs are required by HUD to
> use a comparable database which is defined as relational database that meets all HMIS Data
> Standards and the minimum standards of HMIS privacy and security requirements, including
> HUD’s most recent reporting standards and comma separated value (CSV) format
> specifications.

---

## What data is optional in a project?

That is all dependent on which Federal Programs that specific organization is working with. Here is a list of different Federal Programs and the data needed for that program:

| Manual Name               | Federal partner                                                                                                                                                                                                                                      | Program (s)                                                                                                         |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| CoC Program HMIS Manual   | U.S. Department of Housing and Urban Development - Office of Special Needs Assistance Programs [CoC Program Information](https://www.hudexchange.info/programs/coc/ "CoC Program Information")                                                       | All Continuum of Care (CoC) Program component projects.                                                             |
| YHDP HMIS Manual          | U.S. Department of Housing and Urban Development - Office of Special Needs Assistance Programs [YHDP Information](https://www.hudexchange.info/programs/yhdp/ "YHDP Information")                                                                    | All Youth Homelessness Demonstration Program (YHDP) projects                                                        |
| ESG Program HMIS Manual   | U.S. Department of Housing andUrban Development - Office of Special Needs Assistance Programs [ESG Program Information](https://www.hudexchange.info/programs/esg/ "ESG Program Information")                                                        | All Emergency Solutions Grant (ESG) Program component projects.                                                     |
| HOPWA Program HMIS Manual | U.S. Department of Housing and Urban Development - Office of HIV/AIDS Housing [HOPWA Program Information](https://www.hudexchange.info/hopwa/ "HOPWA Program Information")                                                                           | All Housing Opportunities for Persons with AIDS (HOPWA) program component projects.                                 |
| PATH Program HMIS Manual  | U.S. Department of Health and Human Services - Substance Abuse and Mental Health Services Administration [PATH Program Information](http://www.samhsa.gov/homelessness-programs-resources/grant-programs-services/path "PATH Program Information")   | All Projects for Assistance in Transition from Homelessness (PATH) component projects.                              |
| RHY Program HMIS Manual   | U.S. Department of Health and Human Services - Administration for Children and Families - Family and Youth Services Bureau [RHY Program Information](http://www.acf.hhs.gov/programs/fysb/programs/runaway-homeless-youth "RHY Program Information") | All Runaway and Homeless Youth program component projects.                                                          |
| VA Program HMIS Manual    | Department of Veterans Affairs [VA Program information](http://www.va.gov/homeless/ "VA Program Information")                                                                                                                                        | Supportive Services for Veteran Families (SSVF), Grant-Per-Diem (GPD), and Healthcare for Homeless Veterans (HCHV). |
| VASH Program HMIS Manual  | U.S. Department of Housing and Urban Development - VASH and Department of Veterans Affairs [VASH Program](https://www.hudexchange.info/programs/hud-vash/ "VASH Program Information")                                                                | Veterans Affairs Supportive Housing (VASH) program.                                                                 |
