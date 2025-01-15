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

### What additional fields are needed for projects that don’t exist within a referral in the Ellis App?

The Ellis app creates referrals for Nonprofits that has a set of data, like user data and information about that specific referrals. Projects contain data as stated below, some of these data points are not contained in a referral from the Ellis App. Below are the data points that are needed for a project, that we do not have within a referral process or the client data.

The user data structure can be changed to include these missing fields:

> 1.  Suffix
> 2.  Name Data Quality
> 3.  SSN Data Quality
> 4.  DOB Data Quality
> 5.  Veteran Status
> 6.  Disability Condition

The organization data structure are missing these elements:

> 1.  Victim Service Provider
> 2.  Continuum of Care Information
> 3.  Funding Sources
> 4.  Bed and Unit Inventory Information
> 5.  HMIS Participation Status
> 6.  Coordinated Entry Participation Status

These data elements and which fields they contain can be found in the _PDDEandUDETemplate_ within this folder.

---

### How will we get additional elements?

There are elements that are needed in a project, depending on the programs an organization is a part of. Due to this, the universal elements that can exist via the user and organization data structure, we need to still retrieve the elements needed for those projects.

How are we going to retrieve these data elements? I assume we create a new page on the Ellis App for this.

---

### What values can be stored within the client object?

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

Program related templates are within the _Federal Partner Program Data_ and _Program Specific Data_ folders. Each of those folders contain templates that breakdown the data elements that relate to programs. These files contain only the **required** data elements for those programs. There are additional elements that are needed for programs, such as the common program elements and the referral information.

---

### How do we store data in a project?

It should be a json file that has all the data arrayed into key-value pairs. An example of data being sent to the HUD would help with understanding how exactly we should structure it.

---

### At what point are elements collected?

For each project there are elements that are collected at certain intervals, either at the beginning or the end of a project. Here is the list of elements and when they are collected for a project:

#### <u>PDDEs:</u>

- All Organizational elements are collected at _"Initial HMIS project setup, reviewed/updated no less than annually."_
  - Except for **Bed and Unit Inventory Information** and **HMIS Participation Status** these two elements should be collected at _"Initial HMIS project setup reviewed at least annually and updated as needed to reflect changes."_

#### <u>UDEs:</u>

- Elements that should be collected at _Record Creation_:

  - 3.01 Name
  - 3.02 SSN
  - 3.03 DOB
  - 3.04 Race and Ethnicity
  - 3.06 Gender
  - 3.07 Veteran Status

- Elements that should be collected at _Project Start_:

  - 3.08 Disabling Condition (Edit as necessary to reflect new information)
  - 3.10 Project Start Date
  - 3.15 Relationship to Head of Household
  - 3.16 Enrollement CoC
  - 3.917 Prior Living Situation (3.917A and 3.917B)

- Elements that should be collected at _Project Exit_:

  - 3.11 Project Exit Date
  - 3.12 Destination

- Elements that should be collected at _Occurrence Point_:
  - 3.20 Housing Move-In Date
    - At move-in – must be entered if/when a household moves into
      any type of permanent housing, regardless of funding source or whether the
      project is providing the rental assistance to differentiate between clients who are housed and those who are experiencing homelessness at different points during
      their enrollment.

#### <u>Common Program Specific Elements:</u>

- Elements that should be collected at _Project Start, Update, Annual Assessment, and Project Exit_:

  - 4.02 Income and Sources
  - 4.03 Non-Cash Benefits
  - 4.04 Health Insurance

- Elements that should be collected at _Project Start, Update, and Project Exit_:

  - 4.05 Physical Disability
  - 4.06 Developmental Disability
  - 4.07 Chronic Health Condition
  - 4.08 HIV/AIDS
  - 4.09 Mental Health Disorder
  - 4.10 Substance Use Disorder

- Elements that should be collected at _Project Start and Update_:

  - 4.11 Domestic Violence

- Elements that should be collected at _Occurrence Point_:

  - 4.12 Current Living Situation (At the Time of Contact)
  - 4.13 Date of Engagement (At the Point of Engagement)
  - 4.14 Bed-Night Date (As Provided)

- Elements that should be collected at _At occurence_:
  - 4.19 Coordinated Entry Assessment
  - 4.20 Coordinated Entry Event

#### <u>HUD-CoC Only Required Elements:</u>

- Elements that should be collected at _Occurrence Point_:

  - C2 Moving On Assistance Provided (as provided)

- Elements that should be collected at _Project Start and Project Exit_:

  - C3 Youth Education Status

- Elements that should be collected at _Project Start_:
  - C4 Translation Assistance Needed

#### <u>HUD-HOPWA Required Elements:</u>

- Elements that should be collected at _Occurrence Point_:

  - W1 Services Provided - HOPWA (As Provided)
  - W2 Financial Assistance – HOPWA (As Provided)

- Elements that should be collected at _Project Start, Update, and Project Exit_:

  - W3 Medical Assistance
  - W6 Prescribed Anti-Retroviral

- Elements that should be collected at _Project Start, Update, Annual Assessment, and Project Exit_:

  - W4 T-Cell (CD4) and Viral Load

- Elements that should be collected at _Project Exit_:
  - W5 Housing Assessment at Exit

#### <u>HHS-PATH Required Elements:</u>

- Elements that should be collected at _Occurrence Point_:

  - P1 Services Provided – PATH Funded (As Provided)
  - P2 Referrals Provided – PATH (As Provided)
  - P3 PATH Status (At Determination; collect once, at or before exit, when the
    status is determined)

- Elements that should be collected at _Project Start, Update, Annual Assessment, and Project Exit_:
  - P4 Connection with SOAR

#### <u>HHS-RHY Required Elements:</u>

- Elements that should be collected at _Project Start_:

  - R1 Referral Source
  - R2 RHY – BCP Status
  - R3 Sexual Orientation
  - R11 Formerly a Ward of Child Welfare/Foster Care Agency
  - R12 Formerly a Ward of Juvenile Justice System
  - R13 Family Critical Issues

- Elements that should be collected at _Project Start and Project Exit_:

  - R4 Last Grade Completed
  - R5 School Status
  - R6 Employment Status
  - R7 General Health Status
  - R8 Dental Health Status
  - R9 Mental Health Status

- Elements that should be collected at _Project Start and Update_:

  - R10 Pregnancy Status

- Elements that should be collected at _Occurrence Point_:

  - R14 RHY Service Connections (At First Service)

- Elements that should be collected at _Project Exit_:

  - R15 Commercial Sexual Exploitation/Sex Trafficking
  - R16 Labor Exploitation/Trafficking
  - R17 Project Completion Status
  - R18 Counseling
  - R19 Safe and Appropriate Exit

- Elements that should be collected at _Post Exit_:
  - R20 Aftercare Plans

#### <u>VA Required Elements:</u>

- Elements that should be collected at _Record Creation_:

  - V1 Veteran’sInformation

- Elements that should be collected at _Occurrence Point_:

  - V2 Services Provided – SSVF (As Provided)
  - V3 Financial Assistance – SSVF (As Provided)
  - V8 HUD-VASH Voucher Tracking (As Provided)

- Elements that should be collected at _Project Start_:

  - V4 Percent of AMI (SSVF Eligibility)
  - V6 VAMC Station Number
  - V7 HP Targeting Criteria

- Elements that should be collected at _Project Exit_:
  - V9 HUD-VASH Exit Information

### What should the data that is being sent to the HUD look like?

### How do we send data to the HUD?
