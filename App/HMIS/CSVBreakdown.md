# HMIS CSV Documentation

This is how the final file should look when it comes to sending the report to the HUD. Each of the values are specified in their structure using the [HMIS CSV Specifications](https://files.hudexchange.info/resources/documents/HMIS-CSV-Format-Specifications-2024.pdf "HMIS CSV Specifications") document.

The breakdown of each element and how they should look in the final CSV document, is shown there.

---

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
> in the HMIS Data Dictionary, basic rules and assumptions for HMIS export and import processes,
> and general descriptions of terms used.

### What types of files are in the HMIS CSV Specificaiton?

These are the different file groups that exist as a CSV:

> Files are grouped into the following sections based on the type of data they contain: Export,
> Project Descriptor, Client, and Enrollment. A complete list of each data element and the name of
> the CSV file in which it appears is included in Appendix A.

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

## File Definitions

### Column Breakdown

Here are column descriptors that are in CSV files:

| Column    | Descriptor                                                                                                                                                                                                                                                                                                                                                       |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **DE#**   | This is the data standards identification of fields; it includes the data element number and field identifier (numbers for primary fields and letters for dependent fields) as listed the HMIS Data Dictionary.                                                                                                                                                  |
| **Name**  | This lists the CSV field name for each field defined. Many fields may be shortened, for example Date of birth to DOB.                                                                                                                                                                                                                                            |
| **Type**  | The data type for the field. The types included are defined in the Data Types section.                                                                                                                                                                                                                                                                           |
| **List**  | Fields that have response categories defined in the HMIS Data Dictionary or in this document will have a list number in this column. (Appendix B)                                                                                                                                                                                                                |
| **Null**  | Fields that may be null are identified with a Y (for Yes). Any field not specifically permitted to be null should have an exported value of the appropriate data type; for non-nullable fields with response categories defined in the HMIS Data Dictionary, 99 (Data not collected) should be exported for blank fields/missing data unless otherwise specified |
| **Notes** | Includes definitions, specific validation requirements, and other relevant information. Regular expressions are included for some fields as a supplement to descriptions of validation requirements; they are included as a convenience only and there is no requirement to use them.                                                                            |

#### Repeated Data:

- Data that are repeated in multiple files only have a **DE#** identified in the file where they
  originate. For example, 5.08 Personal ID serves as a unique identifier (primary key) in
  Client.csv and its **DE#** is listed there. The same identifier is used to associate data in other
  CSV files with a client (foreign key), but the **DE#** is not listed when it appears in other files.

### How do you send the document to HUD/other programs?
