# HMIS Data Integration

This file is here to talk about the implementation of HMIS Data structures into the Ellis App. This will not be a step by step integration, but rather a breakdown of data structures within HMIS.

## Documentation Links

The information in this file is being derived from the HMIS documentation provided below:

- If you do not know certain terms within this documentation refer to this document:
  - [FY 2024 HMIS Data Standards Manual](https://files.hudexchange.info/resources/documents/HMIS-Data-Standards-Manual-2024.pdf "2024 Data Standards Manual")
- If there are data structure related question refer to this document:
  - [FY 2024 HMIS Data Dictionary – Version 1.6](https://files.hudexchange.info/resources/documents/HMIS-Data-Dictionary-2024.pdf "2024 Data Dictionary")
- Bitfocus has an HMIS built and is used by some of the current NonProfits in the SF area. They have a page that shows what a form looks like for specific projects and programs they may be associated with. This could help visualize what data we need to collect:
  - [2024 HMIS Sample Forms](https://help.bitfocus.com/2024-hmis-sample-forms, "Bitfocus 2024 HMIS Sample Forms")
- If there are questions that relate to Comma Separated Value (CSV) documentation or specifications refer to this document:
  - [HMIS CSV Specifications](https://files.hudexchange.info/resources/documents/HMIS-CSV-Format-Specifications-2024.pdf "HMIS CSV Specifications")

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

Data is set up in an HMIS through projects. Each project contains different data structures and compenents. The data differs for many reasons, federal program relations, privacy reason, and/or if an organization wants to add additional data components.

## Project Data Information

### Which projects need HMIS integration?

> It is used by all projects
> that target services to persons experiencing homelessness within Office of Special
> Needs Assistance Programs (SNAPS) and the office of HIV-AIDS Housing. It is also used by other federal partners from the U.S. Department of Health and
> Human Services (HHS) and the U.S. Department of Veterans Affairs (VA) and their respective
> programs to measure project performance and participate in benchmarking of the national effort
> to end homelessness

Any organization that is working with these offices must have an HMIS to report data.

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

### What data is optional in a project?

That is all dependent on which Federal Programs that specific organization is working with. Here is a list of different Federal Programs and the data needed for that program:

> | Manual Name               | Federal partner                                                                                                                                                                                                                                      | Program (s)                                                                                                         |
> | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
> | CoC Program HMIS Manual   | U.S. Department of Housing and Urban Development - Office of Special Needs Assistance Programs [CoC Program Information](https://www.hudexchange.info/programs/coc/ "CoC Program Information")                                                       | All Continuum of Care (CoC) Program component projects.                                                             |
> | YHDP HMIS Manual          | U.S. Department of Housing and Urban Development - Office of Special Needs Assistance Programs [YHDP Information](https://www.hudexchange.info/programs/yhdp/ "YHDP Information")                                                                    | All Youth Homelessness Demonstration Program (YHDP) projects                                                        |
> | ESG Program HMIS Manual   | U.S. Department of Housing andUrban Development - Office of Special Needs Assistance Programs [ESG Program Information](https://www.hudexchange.info/programs/esg/ "ESG Program Information")                                                        | All Emergency Solutions Grant (ESG) Program component projects.                                                     |
> | HOPWA Program HMIS Manual | U.S. Department of Housing and Urban Development - Office of HIV/AIDS Housing [HOPWA Program Information](https://www.hudexchange.info/hopwa/ "HOPWA Program Information")                                                                           | All Housing Opportunities for Persons with AIDS (HOPWA) program component projects.                                 |
> | PATH Program HMIS Manual  | U.S. Department of Health and Human Services - Substance Abuse and Mental Health Services Administration [PATH Program Information](http://www.samhsa.gov/homelessness-programs-resources/grant-programs-services/path "PATH Program Information")   | All Projects for Assistance in Transition from Homelessness (PATH) component projects.                              |
> | RHY Program HMIS Manual   | U.S. Department of Health and Human Services - Administration for Children and Families - Family and Youth Services Bureau [RHY Program Information](http://www.acf.hhs.gov/programs/fysb/programs/runaway-homeless-youth "RHY Program Information") | All Runaway and Homeless Youth program component projects.                                                          |
> | VA Program HMIS Manual    | Department of Veterans Affairs [VA Program information](http://www.va.gov/homeless/ "VA Program Information")                                                                                                                                        | Supportive Services for Veteran Families (SSVF), Grant-Per-Diem (GPD), and Healthcare for Homeless Veterans (HCHV). |
> | VASH Program HMIS Manual  | U.S. Department of Housing and Urban Development - VASH and Department of Veterans Affairs [VASH Program](https://www.hudexchange.info/programs/hud-vash/ "VASH Program Information")                                                                | Veterans Affairs Supportive Housing (VASH) program.                                                                 |

---

### How do you know what data goes within a project?

The Data Dictonary breaks down all the fields and data elements within a project. This lists all the elements that could exist in any HMIS project.

To know which data elements align with what projects and programs look for the "_Element Type_" and the "_Funder: Program-Component_" of that element. This will show which elements are needed for which programs and project types.

---

## Project Setup

> One of the most critical steps in accurate data collection and reporting is ensuring that a project
> is set up properly in HMIS. If project setup is done incorrectly, it will jeopardize the ability to
> produce accurate, reliable reports.

It is really important to make sure all projects are set up correctly, or the data may be unusable.

There is a [Project Setup Tool](https://www.hudexchange.info/programs/hmis/hmis-project-set-up-tool/ "HMIS Project Setup Tool") that allows for initial setup for projects. This will allow users to see the required and optional data needed in that specific project type, based on Federal Programs.

---

### What type of projects enter data into an HMIS?

1. Coordinated Entry
2. Day Shelter
3. Emergency Shelter – Entry Exit
4. Emergency Shelter – Night-by-Night
5. Homelessness Prevention
6. Other
7. PH – Housing Only
8. PH – Housing with Services (no disability required for entry)
9. PH – Permanent Supportive Housing (disability required for entry)
10. PH – Rapid Re-Housing
11. RETIRED
12. Safe Haven
13. Services Only
14. Street Outreach
15. Transitional Housing

---

### Project Descriptor Data Elements (PDDEs)

> Project descriptor data elements are intended to identify the organization, specific
> project, and project details to which an individual client record is associated in an HMIS.

These are the **required** elements that are need in all projects relating to organizations, programs and the specific project:

1. Organization Information

   - To uniquely identify organizations operating one or more projects that enter data into HMIS

2. Project Information

   - To uniquely identify each project entering data into HMIS

3. Continuum of Care Information

   - To associate each project entering data into HMIS, as well as any residential continuum projects
     not participating in HMIS, with one or more Continuum of Care (CoC) for reporting and data
     exchange purposes.

4. Funding Sources

   - To identify funding sources for each project entering data into HMIS

5. Bed and Unit Inventory Information

   - To record bed and unit inventory information for each residential project entering data into
     HMIS

6. HMIS Participation Status

   - To identify the HMIS or comparable database participation status of all Continuum projects

7. Coordinated Entry Participation Status

   - The Coordinated Entry Participation Status is designed to identify a project’s type of
     engagement in the local Coordinated Entry System (CES). This element captures information
     about whether a project is an access point for the CES and if the project accepts referrals from
     the CES.

---

### Universal Data Elements (UDEs)

These are the data elements, for clients, that are **required** in all projects:

> | <div align="center"> Universal Identifier Elements (One and Only One per Client Record) </div> | <div align="center"> Universal Project Stay Elements (One or More Value(s) Per Client, One Value Per Project Stay) </div> |
> | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
> | 3.01 Name                                                                                      | 3.08 Disabling Condition                                                                                                  |
> | 3.02 Social Security Number                                                                    | 3.10 Project Start Date                                                                                                   |
> | 3.03 Date of Birth                                                                             | 3.11 Project Exit Date                                                                                                    |
> | 3.04 Race and Ethnicity                                                                        | 3.12 Destination                                                                                                          |
> | 3.06 Gender                                                                                    | 3.15 Relationship to Head of Household                                                                                    |
> | 3.07 Veteran Status                                                                            | 3.16 Enrollment CoC                                                                                                       |
> |                                                                                                | 3.917 Prior Living Situation                                                                                              |
> |                                                                                                | 3.20 Housing Move-In Date                                                                                                 |

- Data elements 3.01 through 3.07 are required to have one response per client, regardless of how many project enrollments that client has in the system. The remaining UDEs are to be collected at least once per project enrollment. The timing of when the data are to be collected and about whom is noted in each data element.

---

### Breakdown of Elements

Each element has multiple field values affiliated with them. These fields are required for data collection. Below is a breakdown of the "Name" UDE to serve as an example (created without a reference and using my own understanding of the structure) of an element with multiple fields within it:

> ```
> "name": {
>   "firstName": "Tim",
>   "middleName": "James",
>   "lastName": "Langston",
>   "suffix": "",
>   "nameDataQuality": 1
> }
> ```

The _nameDataQuality_ field has a value of **1** because the data dictonary has keys that represent the string value of the object. The different key-value pairs for that field are here:

> | Key | Value                                       |
> | --- | ------------------------------------------- |
> | 1   | Full name reported                          |
> | 2   | Partial, street name, or code name reported |
> | 8   | Client doesn’t know                         |
> | 9   | Client prefers not to answer                |
> | 99  | Data not collected                          |

This is just an example of one element (**Name**) and a field (**nameDataQuality**) within it. All element are broken down into fields, some with user input values and others with HUD related key-value pairs. The data dictionary also states all of the project types and programs that specifc element is required/used in.

An example template made from the information I know is the other file in this folder called _HMISTemplate.json_. This takes what is shown in the [Data Dictionary](https://files.hudexchange.info/resources/documents/HMIS-Data-Dictionary-2024.pdf "2024 Data Dictionary") and displays them as a json file. That file is only a template for PDDEs and UDEs, nothing program related is within that file.

---

### How do we store data in a project?

It should be a json file that has all the data arrayed into key-value pairs. An example of data being sent to the HUD would help with understanding how exactly we should structure it.

### What should the data that is being sent to the HUD look like?

### How do we send data to the HUD?

---

## HMIS CSV Documentation

This is how the final file should look when it comes to sending the report to the hUD. Each of the values are specified in their structure using the [HMIS CSV Specifications](https://files.hudexchange.info/resources/documents/HMIS-CSV-Format-Specifications-2024.pdf "HMIS CSV Specifications") document.

The breakdown of each element and how they should look in the final CSV document, is shown there.

### What is the CSV used for?

> There are several purposes for which HMIS data might be exported from one system and
> imported to another. The use cases that the HMIS CSV and HMIS XML formats are primarily
> intended to support include:
>
> - Migration from one HMIS application to another;
> - Warehousing of data from multiple HMIS implementations for analysis and reporting;
> - Self-service analytics and data quality tools that rely on HMIS CSV and HMIS XML
>   schema; and
> - Participation in a local HMIS implementation by regularly providing data entered and
>   exported from an alternate database.

This file is a technical file, to help have a common format and help simplify the process of exporting and importing HMIS data in a standard manner.

### What is the scope of a CSV?

> The scope of this document is
> generally limited to data collected in a manner consistent with the HMIS Data Dictionary. The
> HMIS CSV format may be extendedto include additional files and fields by parties engaged in HMIS
> data exchange; technical assistance maybe available.

### What is included in a CSV?

Data elements that are in the [HMIS Data Dictionary](https://files.hudexchange.info/resources/documents/HMIS-Data-Dictionary-2024.pdf "2024 Data Dictionary").

> This document defines CSV files and fields required for data exchange of all data elements defined
> in theHMIS Data Dictionary, basic rules and assumptions for HMIS export and import processes,
> and general descriptions of terms used.

### CSV Document breakdown

1. **Appendix A** lists all FY2024 HMIS Data Standards data elements and the CSV file in which they appear.

2. **Appendix B** includes response categories and associated data exchange values for all option list fields defined in the FY2024 HMIS Data Standards.

## Appendix A

Shows a chart of all the data elements/fields and the file they are associated with:
| # | Data Element Name | File Location |
| ---- | ------------------------ | ---------------- |
| 2.01 | Organization Information | Organization.csv |
| 2.02 | Project Information | Project.csv, Affiliation.csv |
| 2.03 | Continuum of Care Information | ProjectCoC.csv |
| 2.06 | Funding Sources | Funder.csv |
| 2.07 | Bed and Unit Inventory Information | Inventory.csv |
| 2.08 | HMIS Participation | HMISParticipation.csv |
| 2.09 | CE Participation | CEParticipation.csv |
| 3.01 | Name | Client.csv |
| 3.02 | Social Security Number | Client.csv |
| 3.03 | Date of Birth | Client.csv |
| 3.04 | Race and Ethnicity | Client.csv |
| 3.06 | Gender | Client.csv |
| 3.07 | Veteran Status | Client.csv |
| 3.08 | Disabling Condition | Enrollment.csv |
| 3.10 | Project Start Date | Enrollment.csv |
| 3.11 | Project Exit Date | Exit.csv |
| 3.12 | Destination | Exit.csv |
| 3.15 | Relationship to Head of Household | Enrollment.csv |
| 3.16 | Enrollment CoC | Enrollment.csv |
| 3.20 | Housing Move-In Date | Enrollment.csv |
| 3.917 | Prior Living Situation | Enrollment.csv |
| 4.02 | Income and Sources | IncomeBenefits.csv |
| 4.03 | Non-Cash Benefits | IncomeBenefits.csv |
| 4.04 | Health Insurance | IncomeBenefits.csv |
| 4.05 | Physical Disability | Disabilities.csv |
| 4.06 | Developmental Disability | Disabilities.csv |
| 4.07 | Chronic Health Condition | Disabilities.csv |
| 4.08 | HIV/AIDS | Disabilities.csv |
| 4.09 | Mental Health Problem | Disabilities.csv |
| 4.10 | Substance Use Disorder | Disabilities.csv |
| 4.11 | Domestic Violence | HealthAndDV.csv |
| 4.12 | Current Living Situation | CurrentLivingSituation.csv |
| 4.13 | Date of Engagement | Enrollment.csv |
| 4.14 | Bed Night Date | Services.csv |
| 4.19 | Coordinated Entry Assessment | Assessment.csv, AssessmentQuestions.csv, AssessmentResults.csv |
| 4.20 | Coordinated Entry Event | Event.csv |
| C2 | Moving On Assistance Provided | Services.csv |
| C3 | Youth Education Status | YouthEducationStatus.csv |
| C4 | Translation Assistance Needed | Enrollment.csv |
| P1 | Services Provided – PATH Funded | Services.csv |
| P2 | Referrals Provided – PATH | Services.csv |
| P3 | PATH Status | Enrollment.csv |
| P4 | Connection with SOAR | IncomeBenefits.csv |
| R1 | Referral Source | Enrollment.csv |
| R10 | Pregnancy Status | HealthAndDV.csv |
| R11 | Formerly a Ward of Child Welfare/Foster Care Agency | Enrollment.csv |
| R12 | Formerly a Ward of Juvenile Justice System | Enrollment.csv |
| R13 | Family Critical Issues | Enrollment.csv |
| R14 | RHY Service Connections | Services.csv |
| R15 | Commercial Sexual Exploitation/Sex Trafficking | Exit.csv |
| R16 | Labor Exploitation/Trafficking | Exit.csv |
| R17 | Project Completion Status | Exit.csv |
| R18 | Counseling | Exit.csv |
| R19 | Safe and Appropriate Exit | Exit.csv |
| R2 | RHY-BCP Status | Enrollment.csv |
| R20 | Aftercare Plans | Exit.csv |
| R3 | Sexual Orientation | Enrollment.csv |
| R4 | Last Grade Completed | EmploymentEducation.csv |
| R5 | School Status | EmploymentEducation.csv |
| R6 | Employment Status | EmploymentEducation.csv |
| R7 | General Health Status | HealthAndDV.csv |
| R8 | Dental Health Status | HealthAndDV.csv |
| R9 | Mental Health Status | HealthAndDV.csv |
| V1 | Veteran’s Information | Client.csv |
| V2 | Services Provided – SSVF | Services.csv |
| V3 | Referrals Provided – SSVF | Services.csv |
| V4 | Percent of AMI | Enrollment.csv |
| V6 | VAMC Station Code | Enrollment.csv |
| V7 | SSVF HP Targeting Criteria | Enrollment.csv |
| V8 | HUD-VASH Voucher Tracking | Services.csv |
| V9 | HUD-VASH Exit Information | Exit.csv |
| W1 | Services Provided – HOPWA | Services.csv |
| W2 | Financial Assistance – HOPWA | Services.csv |
| W3 | Medical Assistance | IncomeBenefits.csv |
| W4 | T-Cell (CD4) and Viral Load | Disabilities.csv |
| W5 | Housing Assessment at Exit | Exit.csv |
| W6 | Prescribed Anti-Retroviral | Disabilities.csv |


### How do you send the document to HUD/other programs?
