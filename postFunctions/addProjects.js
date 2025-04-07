// Construct the HMIS project data
      const projectData = {
        id: `project-${selectedClient.id}-${Date.now()}`, // Unique project ID
        name: `Referral Project for ${client.fullName}`,
        description: `Project created for client ${client.fullName}`,
        startDate: dateStarted,
        clients: [
          {
            clientID: client.id,
            projectEntryDate: dateStarted, // Project entry date
            personalInformation: {
              dob: client.dob,
              dobDataQuality: 1, // Assuming full DOB is reported
              gender: client.demographics.gender,
              race: Array.isArray(client.demographics.race)
                ? client.demographics.race
                : [client.demographics.race], // Ensure race is an array
              ethnicity: client.demographics.primaryLanguage || "", // Placeholder for ethnicity
              veteranStatus: client.vetStatus.toLowerCase() === "yes", // Convert to boolean
              name: {
                firstName: client.firstName,
                middleName: client.middleName || "",
                lastName: client.lastName,
                suffix: client.suffix || "",
                nameDataQuality: 1, // Assuming full name reported
              },
              ssn: {
                value: client.ssn || "", // Default to empty if not provided
                ssnDataQuality: client.ssn ? 1 : 99, // 99 = Not collected
              },
            },
            relationshipToHeadOfHousehold: {
              code: 1, // Assuming client is the head of household
              description: "Self (head of household)",
            },
            residencePriorToProjectEntry: {
              priorLivingSituation: {
                code: 3, // Placeholder: Adjust based on actual client data
                description: "Place not meant for habitation", // Placeholder description
                lengthOfStay: "One month or less", // Placeholder length
              },
            },
            destinationAtExit: {
              code: 10, // Placeholder: Adjust based on actual exit data
              description: "Permanent housing with rental assistance", // Placeholder
            },
            enrollmentDetails: {
              enrollmentCoC: "CA-500", // Placeholder CoC code
              projectEntryDate: dateStarted,
              projectExitDate: "", // Add if applicable
              housingMoveInDate: "", // Add if applicable
            },
            disablingCondition: client.disablingCondition || false, // Default to false
          },
        ],
      };

      // Log the project data for debugging
      console.log("Project Data:", JSON.stringify(projectData, null, 2));

      // Send the HMIS data to the backend
      const projectResponse = await fetch(
        `https://ellis-test-data.com:8000/Projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectData),
        }
      );

      if (!projectResponse.ok) {
        const errorText = await projectResponse.text();
        console.error(
          `Failed to submit project data: ${projectResponse.status} - ${errorText}`
        );
        throw new Error(
          `Failed to submit project data: ${projectResponse.status} - ${errorText}`
        );
      }
