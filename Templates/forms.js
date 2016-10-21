var pd = [
    {
        title: "Customer Overview Document",
        subTitle: "",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'Current Business Model',
        fieldType: 'text-field',
        propName: 'currentBusinessModel',
        required: true
    },
    {
        fieldDescription: 'Are they an existing Rackspace customer?',
        fieldType: 'checkbox-field',
        propName: 'rackspaceCustomer'
    },
    {
        fieldDescription: 'Current Rackspace Setup',
        fieldType: 'textarea-field',
        propName: 'currentRackspaceSetup',
        viewIf: 'rackspaceCustomer',
        viewIfValue: true
    },
    {
        fieldDescription: 'Encore Link',
        fieldType: 'link-field',
        propName: 'encoreLink',
        viewIf: 'rackspaceCustomer',
        viewIfValue: true,
        required: true
    },
    {
        title: "What is the primary driver for this prospect looking to Rackspace for managed AWS?",
        subTitle: "More than one can apply",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'Customer does not want to make managing clouds core to their business',
        fieldType: 'checkbox-field',
        propName: 'docDriverManagingClouds'
    },
    {
        fieldDescription: 'Customer can’t hire the talent to take advantage of the AWS platform; therefore they lack a point of view and expertise',
        fieldType: 'checkbox-field',
        propName: 'docDriverHireTalent'
    },
    {
        fieldDescription: 'Customer doesn’t want to add headcount to operations or overload their existing staff',
        fieldType: 'checkbox-field',
        propName: 'docDriverHeadCount'
    },
    {
        fieldDescription: 'Customer prefers to work with experts in managing and operating cloud(s)',
        fieldType: 'checkbox-field',
        propName: 'docDriverPrefersExpert'
    },
    {
        fieldDescription: 'Customer has multiple workloads on different platforms and wants ‘one throat to choke',
        fieldType: 'checkbox-field',
        propName: 'docDriverMultipleWorkloads'
    },
    {
        fieldDescription: 'Customer has had a bad experience with another managed service provider and wants a change',
        fieldType: 'checkbox-field',
        propName: 'docDriverBadExperience'
    },
    {
        fieldDescription: 'Other Drivers',
        fieldType: 'text-field',
        propName: 'docDriverOther'
    },
    {
        title: "Current workload",
        subTitle: "",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'Is this a greenfield deployment of a new application',
        fieldType: 'checkbox-field',
        propName: 'docCurrentWorkloadGreenfield'
    },
    {
        fieldDescription: 'Where is the current application hosted?',
        fieldType: 'select-field',
        propName: 'currentWorkloadHosting',
        options: ['Rackspace', 'AWS', 'In House', 'Other'],
        viewIf: 'docCurrentWorkloadGreenfield',
        viewIfValue: false
    },
    {
        fieldDescription: 'What AWS services are they using?',
        fieldType: "textarea-field",
        propName: 'docCurrentAWSServices',
        viewModel: 'resource-group',
        viewIf: 'currentWorkloadHosting',
        viewIfValue: 'AWS'
    },
    {
        fieldDescription: 'What environments exist (prod, dev, test, etc)?',
        fieldType: "text-field",
        propName: 'docCurrentAWSEnvironments',
        viewIf: 'currentWorkloadHosting',
        viewIfValue: 'AWS'
    },
    {
        fieldDescription: 'Are they currently managed internally or by a 3rd party?',
        fieldType: "text-field",
        propName: 'docCurrentAWSManagement',
        viewIf: 'currentWorkloadHosting',
        viewIfValue: 'AWS'
    },
    {
        fieldDescription: 'What is their approximate size/scale?',
        fieldType: "text-field",
        propName: 'docCurrentAWSScale',
        viewIf: 'currentWorkloadHosting',
        viewIfValue: 'AWS'
    },
    {
        fieldDescription: 'Who designed/deployed them?',
        fieldType: "text-field",
        propName: 'docCurrentAWSDesigner',
        viewIf: 'currentWorkloadHosting',
        viewIfValue: 'AWS'
    },
    {
        fieldDescription: 'Are they looking to move as-is or re-architect in line with best practices/guidance from Rackspace?',
        fieldType: "text-field",
        propName: 'docCurrentAWSPlans',
        viewIf: 'currentWorkloadHosting',
        viewIfValue: 'AWS'
    },
    {
        title: "Does the customer need architecture help and guidance?",
        subTitle: "Help me architect security, elasticity and availability using the right mix of AWS products…now and in the future when things change.",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'Have they got some AWS experience, but feel they need more?',
        fieldType: 'checkbox-field',
        propName: 'docSomeExperience'
    },
    {
        fieldDescription: 'Are they completely new to AWS and looking for someone to "do it all"?',
        fieldType: 'checkbox-field',
        propName: 'docCompletelyNew'
    },
    {
        fieldDescription: 'Are they planning on using a partner alongside their MSP to help implement?',
        fieldType: 'checkbox-field',
        propName: 'docThirdParty'
    },
    {
        title: "Does the customer need migration assistance?",
        subTitle: "Help me migrate to the AWS platform and promote my app to production.",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'Does the customer require migration planning assistance?',
        fieldType: 'checkbox-field',
        propName: 'docRequireMigrationPlanning'
    },
    {
        fieldDescription: 'Does the customer require migration execution assistance?',
        fieldType: 'checkbox-field',
        propName: 'docRequireMigrationExecution'
    },
    {
        title: "Does the customer need SysOps/SysAd level support? i.e. patching, backing up, monitoring, ongoing maintenance",
        subTitle: "I need technologists to manage system operations for my app, but I don’t want to/can’t hire a lot of sys admins that are not core to my business.",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'The customer wants support inside the guest OS (patching, backup, monitoring etc)?',
        fieldType: 'checkbox-field',
        propName: 'docOSSupport'
    },
    {
        fieldDescription: 'Details of OS support',
        fieldType: "text-field",
        propName: 'docOSSupportDetails',
        viewIf: 'docOSSupport',
        viewIfValue: true
    },
    {
        title: "Does the customer need Data management assistance? i.e. Amazon RDS, S2, Glacier",
        subTitle: "Help me scale and secure my database.",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'What database technologies are they using today?',
        fieldType: "text-field",
        propName: 'docDB'
    },
    {
        fieldDescription: 'Do they have existing DBA expertise in-house or contracted?',
        fieldType: "text-field",
        propName: 'docDBAExpertise'
    },
    {
        title: "Does the customer need automation or DevOps support?",
        subTitle: "Help me make my application easier to deploy and manage in the cloud with standards and automation.",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'How experienced is the prospect with automation?',
        fieldType: "text-field",
        propName: 'docAutomationExperience'
    },
    {
        fieldDescription: 'What are the main challenges and pains with the way they deploy servers and applications today?',
        fieldType: "text-field",
        propName: 'docCurrentDeploymentChallenges'
    },
    {
        fieldDescription: 'Which automation tools are being used?  i.e. Chef/Puppet/Ansible',
        fieldType: "text-field",
        propName: 'docCurrentAutomationTools'
    },
    {
        fieldDescription: 'Is Cloud Formation being used?',
        fieldType: 'checkbox-field',
        propName: 'docCloudFormationUsed'
    },
    {
        fieldDescription: 'Where is the prospect looking for us to help them with automation?',
        fieldType: "text-field",
        propName: 'docProspectAutomationRequests'
    },
    {
        fieldDescription: 'Does the prospect use IAM (AWS Identity and Access Management)',
        fieldType: 'checkbox-field',
        propName: 'docProspectUsingIAM'
    },
    {
        fieldDescription: 'How is IAM Being used?',
        fieldType: "text-field",
        propName: 'docProspectUsingIAMDetails',
        viewIf: "docProspectUsingIAM",
        viewIfValue: true
    },
    {
        fieldDescription: 'Where is the prospect looking for us to help them with automation?',
        fieldType: "text-field",
        propName: 'docProspectAutomationRequests'
    },
    {
        title: "Does the customer require management of their business applications?",
        subTitle: "",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'Magento?',
        fieldType: 'checkbox-field',
        propName: 'docBusinessMagento'
    },
    {
        fieldDescription: 'AEM?',
        fieldType: 'checkbox-field',
        propName: 'docBusinessAEM'
    },
    {
        title: "Has the customer been briefed about the FAWS offering, service levels and service charges?",
        subTitle: "",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'Based on the information so far which service level/s are suitable?',
        fieldType: 'select-field',
        propName: 'suggestedServiceLevel',
        options: ['Navigator', 'Aviator'],
        required: true,
    },
    {
        fieldDescription: 'If there are multiple accounts with different service level requirements, do include them.',
        fieldType: "text-field",
        propName: 'docServiceOtherAccounts'
    },
    {
        title: "What are the timeframes for this project?",
        subTitle: "",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'When do they want to go live?',
        fieldType: "text-field",
        propName: 'docGoLive'
    },
    {
        fieldDescription: 'Are there any business pressures to reach that deadline? E.g. contract ending, marketing event etc.',
        fieldType: "text-field",
        propName: 'docBusinessPressure'
    },
    {
        title: "Notes",
        subTitle: "",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'Resource Notes',
        fieldType: 'free-form-field', viewModel: 'free-form-field',
        propName: 'docDQDNotes',
        default: '###Enter DQD notes in markdown',
    }
];

var times = [
    {
        title: "Proposed Meeting Times",
        subTitle: "",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'Meeting Option 1',
        fieldType: 'text-field',
        propName: 'meetingOptionOne',
        required: true
    },
    {
        fieldDescription: 'Meeting Option 2',
        fieldType: 'text-field',
        propName: 'meetingOptionTwo',
        required: true
    },
    {
        fieldDescription: 'Meeting Option 3',
        fieldType: 'text-field',
        propName: 'meetingOptionThree',
        required: false
    },
    {
        fieldDescription: 'Scheduling Notes',
        fieldType: 'text-field',
        propName: 'docSchedulingNotes',
        required: false
    }
];

var resources = [
    {
        title: "Proposed AWS Resources",
        subTitle: "",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'Select AWS Resources',
        fieldType: "resource-group",
        propName: 'proposedAWSServices',
        viewModel: 'resource-group'
    },
    {
        title: "Notes",
        subTitle: "",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'Resource Notes',
        fieldType: 'free-form-field',
        viewModel: 'free-form-field',
        propName: 'docProposedResourceNotes',
        default: '###Enter resource notes in markdown',
    },
];

var hld = [
    {
        title: "High Level Diagram",
        subTitle: "",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'Editable Link',
        fieldType: 'link-field',
        propName: 'editableLink',
        required: true
    },
    {
        fieldDescription: 'Viewable Link',
        fieldType: 'link-field',
        propName: 'viewableLink',
        required: true
    },
    {
        fieldDescription: 'Embed Link',
        fieldType: 'text-field',
        propName: 'embedLink',
        required: true
    },
    {
        comment: "If chart does not appear, make sure you are logged into Lucid Chart",
        fieldType: "comment"
    },
    {
        fieldDescription: 'High Level Diagram',
        fieldType: 'frame-field',
        propName: 'docChartEmbedLink'
    },
    {
        title: "Notes",
        subTitle: "",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'HLD Notes',
        fieldType: 'free-form-field',
        viewModel: 'free-form-field',
        propName: 'docHLDNotes',
        default: '###Enter hld notes in markdown'
    },
];

var initialPricing = [
    {
        title: "Preliminary Pricing",
        subTitle: "",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'AWS Monthly Spend',
        fieldType: 'currency-field',
        propName: 'awsMonthlySpend',
        required: true
    },
    {
        fieldDescription: 'Rackspace Service Fee',
        fieldType: 'currency-field',
        propName: 'rackspaceServiceFee',
        required: true
    },
    {
        fieldDescription: 'AWS One Time Fee',
        fieldType: 'currency-field',
        propName: 'awsOneTimeFee'
    },
    {
        fieldDescription: 'Rackspace First Month Service Fee',
        fieldType: 'currency-field',
        propName: 'rackspaceFirstMonthServiceFee'
    },
    {
        fieldDescription: 'Calculator Link',
        fieldType: 'link-field',
        propName: 'calculatorLink',
        default: 'http://calculator.s3.amazonaws.com/index.html#key=calc-067B9625-B5F2-44B4-A2EB-662D5A4FC343',
        required: true
    },
    {
        comment: "Edit calculator below and copy data above. As you save versions of the calculator, replace the link above.",
        fieldType: 'comment'
    },
    {
        fieldDescription: 'Pricing',
        fieldType: 'frame-field',
        propName: 'calculatorLink'
    },
    {
        title: "Notes",
        subTitle: "",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'Pricing Notes',
        fieldType: 'free-form-field', viewModel: 'free-form-field',
        propName: 'docPricingNotes',
        default: '###Enter pricing notes in markdown'
    },
];

var initialApproval = [
    {
        title: "Customer Approval of Preliminary Pricing",
        subTitle: "",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'Notes',
        fieldType: 'free-form-field', viewModel: 'free-form-field',
        propName: 'docPreApprovalNotes',
        default: '###Enter customer notes in markdown'
    },
];

var dd = [
    {
        title: "High Level Scoping",
        subTitle: "",
        fieldType: "section-header"
    },
    {
        fieldDescription: "General overview of business functionality that the application(s) provide",
        fieldType: "textarea-field",
        propName: "generalOverview"
    },
    {
        fieldDescription: 'Is this a greenfield deployment of a new application',
        fieldType: 'checkbox-field',
        propName: 'docCurrentWorkloadGreenfield',
        default: false,
        prePopulate: true,
        prePopulateFromDoc: "dqd",
        prePopulateFromField: "docCurrentWorkloadGreenfield"
    },
    {
        fieldDescription: "Existing AWS footprint (Details of any accounts being assumed)",
        fieldType: "textarea-field",
        propName: "existingAWSFootprint",
        viewIf: "docCurrentWorkloadGreenfield",
        viewIfValue: false
    },
    {
        fieldDescription: "Migration Approach",
        fieldType: "textarea-field",
        propName: "migrationApproach",
        viewIf: "docCurrentWorkloadGreenfield",
        viewIfValue: false
    },
    {
        fieldDescription: "Migration Assistance",
        fieldType: "textarea-field",
        propName: "migrationAssistance",
        viewIf: "docCurrentWorkloadGreenfield",
        viewIfValue: false
    },
    {
        fieldDescription: "Regulatory compliance requirements (e.g. PCI-DSS, SOX, SSAE16",
        fieldType: "text-field",
        propName: "regulatoryCompliance",
    },
    {
        fieldDescription: "Primary consumers of app/service (Internal/Employees, External/Customers, Everyone, No one/backend process, etc.)",
        fieldType: "textarea-field",
        propName: "primaryConsumer"
    },
    {
        fieldDescription: "Primary Contact; Name, Title and Contact details (Typically owns the whole account and makes commercial decisions)",
        fieldType: "textarea-field",
        propName: "primaryContact"
    },
    {
        fieldDescription: "Application Owner(s); Name, Title and Contact details (Typically, used for support escalation. If there are many apps and separate owners, list them separately)",
        fieldType: "textarea-field",
        propName: "applicationOwners"
    },
    {
        title: "Account/VPC Topology",
        subTitle: "",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'High-Level account and VPC Strategy',
        fieldType: 'text-field',
        propName: 'accountVPCStrategy',
        default: 'Separate account for production and non production'
    },
    {
        fieldDescription: 'Proposed Regions',
        fieldType: 'text-field',
        propName: 'proposedRegions',
        placeholder: 'us-east-1, eu-central-1'
    },
    {
        fieldDescription: 'How will future work-loads be incorporated?',
        fieldType: 'text-field',
        propName: 'futureWorkLoads',
        default: 'Additional Accounts and/or VPCs'
    },
    {
        title: "Network Design",
        subTitle: "",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'Using Nat Gateway',
        fieldType: 'checkbox-field',
        propName: 'natGateway',
        default: true
    },
    {
        fieldDescription: 'Non-standard NAT setup details',
        fieldType: 'textarea-field',
        propName: 'nonStandardNatDetails',
        viewIf: "natGateway",
        viewIfValue: false
    },
    {
        fieldDescription: 'Direct Connect Needed',
        fieldType: 'checkbox-field',
        propName: 'directConnect',
        default: false
    },
    {
        fieldDescription: 'Direct Connect details',
        fieldType: 'textarea-field',
        propName: 'directConnectDetails',
        viewIf: "directConnect",
        viewIfValue: true
    },
    {
        fieldDescription: 'Site-to-Site IPsec VPN(s) Needed',
        fieldType: 'checkbox-field',
        propName: 'siteToSiteVPN',
        default: false
    },
    {
        fieldDescription: 'Site-to-Site IPsec VPN(s) details',
        fieldType: 'textarea-field',
        propName: 'siteToSiteVPNDetails',
        viewIf: "siteToSiteVPN",
        viewIfValue: true
    },
    {
        fieldDescription: 'VPC Peering Needed',
        fieldType: 'checkbox-field',
        propName: 'vpcPeering',
        default: false
    },
    {
        fieldDescription: 'VPC Peering details',
        fieldType: 'textarea-field',
        propName: 'vpcPeeringDetails',
        viewIf: "vpcPeering",
        viewIfValue: true
    },
    {
        fieldDescription: 'Subnet-level isolation required between layers/roles?',
        fieldType: 'checkbox-field',
        propName: 'subnetIsolationNeeded',
        default: false
    },
    {
        fieldDescription: 'Subnet-level isolation details',
        fieldType: 'textarea-field',
        propName: 'subnetIsolationNeededDetails',
        viewIf: "subnetIsolationNeeded",
        viewIfValue: true
    },
    {
        fieldDescription: 'IDS/IPS/WAF Needed?',
        fieldType: 'checkbox-field',
        propName: 'wafNeeded',
        default: false
    },
    {
        fieldDescription: 'IDS/IPS/WAF details',
        fieldType: 'textarea-field',
        propName: 'wafNeededDetails',
        viewIf: "wafNeeded",
        viewIfValue: true
    },
    {
        fieldDescription: 'Routing configuration (Standard – public subnets have default route to internet GW, private subnets have default route to NAT instance)',
        fieldType: 'textarea-field',
        propName: 'routingConfigConfiguration',
        default: 'Standard'
    },
    {
        title: "Identity Design",
        subTitle: "",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'High-Level Identity Approach?',
        fieldType: 'text-field',
        propName: 'identityApproach'
    },
    {
        fieldDescription: 'MFA Requirements (control panel only)',
        fieldType: 'checkbox-field',
        propName: 'mfaRequired',
        default: true
    },
    {
        fieldDescription: 'Federation Requirements',
        fieldType: 'text-field',
        propName: 'federationRequirements',
        default: 'none'
    },
    {
        title: "Architectural Resource Details",
        subTitle: "",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'Architecture Resources',
        fieldType: "resource-group",
        propName: 'awsResources',
        viewModel: 'resource-group',
        prePopulate: true,
        prePopulateFromDoc: 'resources',
        prePopulateFromField: 'proposedAWSServices'
    },
    {
        title: "Complimentary Services",
        subTitle: "",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'Complimentary Services',
        fieldType: 'free-form-field', viewModel: 'free-form-field',
        propName: 'complimentaryServices',
        default: '###Enter Complimentary Services notes in markdown',
    },
    {
        title: "Professional Services",
        subTitle: "",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'Professional Services',
        fieldType: 'free-form-field', viewModel: 'free-form-field',
        propName: 'professionalServices',
        default: '###Enter Complimentary Services notes in markdown',
    },
    {
        title: "Pricing Assumptions",
        subTitle: "",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'Pricing Assumptions',
        fieldType: 'free-form-field', viewModel: 'free-form-field',
        propName: 'pricingAssumptions',
        default: '###Assumptions in Pricing\n' +
        'AWS and Rackspace philosophy on pricing is straightforward: at the end of each month, you pay only for what ' +
        'you use, and you can start or stop using a product at any time. No long-term contracts are required. The ' +
        'following are some estimated costs based on the information gathered during the discovery workshop. Actual ' +
        'costs will likely vary and Rackspace will closely worth with you teams to review utilisation, adjust and ' +
        'optimise as needed. The exact usage of AWS charges will be reviewed at the end of every billing cycle and the ' +
        'Rackspace service charges will be applied to it. More details on the billing model can be found ' +
        '[here](https://manage.rackspace.com/docs/product-guide/billing.html)\n\n' +
        '#####Assumptions\n\n' +
        '* 100% Utilization for all instances\n' +
        '#####Pricing Exclusions\n\n' +
        '* Traffic\n' +
        '* CloudFront Fees\n',
    },
    {
        title: "Further Considerations and Unknowns",
        subTitle: "",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'Further Considerations',
        fieldType: 'free-form-field', viewModel: 'free-form-field',
        propName: 'furtherConsiderations',
        default: '###Enter Further Considerations notes in markdown',
    },
];

var finalPricing = [
    {
        title: "Preliminary Pricing",
        subTitle: "",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'AWS Monthly Spend',
        fieldType: 'currency-field',
        propName: 'awsMonthlySpend',
        required: true,
        prePopulate: true,
        prePopulateFromDoc: "pricing1",
        prePopulateFromField: "awsMonthlySpend"
    },
    {
        fieldDescription: 'Rackspace Service Fee',
        fieldType: 'currency-field',
        propName: 'rackspaceServiceFee',
        required: true,
        prePopulate: true,
        prePopulateFromDoc: "pricing1",
        prePopulateFromField: "rackspaceServiceFee"
    },
    {
        fieldDescription: 'AWS One Time Fee',
        fieldType: 'currency-field',
        propName: 'awsOneTimeFee',
        prePopulate: true,
        prePopulateFromDoc: "pricing1",
        prePopulateFromField: "awsOneTimeFee"
    },
    {
        fieldDescription: 'Rackspace First Month Service Fee',
        fieldType: 'currency-field',
        propName: 'rackspaceFirstMonthServiceFee',
        prePopulate: true,
        prePopulateFromDoc: "pricing1",
        prePopulateFromField: "rackspaceFirstMonthServiceFee"
    },
    {
        fieldDescription: 'Calculator Link',
        fieldType: 'link-field',
        propName: 'calculatorLink',
        default: 'http://calculator.s3.amazonaws.com/index.html#key=calc-067B9625-B5F2-44B4-A2EB-662D5A4FC343',
        required: true,
        prePopulate: true,
        prePopulateFromDoc: "pricing1",
        prePopulateFromField: "calculatorLink"
    },
    {
        comment: "Edit calculator below and copy data above. As you save versions of the calculator, replace the link above.",
        fieldType: 'comment'
    },
    {
        fieldDescription: 'Pricing',
        fieldType: 'frame-field',
        propName: 'calculatorLink'
    },
    {
        title: "Notes",
        subTitle: "",
        fieldType: "section-header"
    },
    {
        fieldDescription: 'Pricing Notes',
        fieldType: 'free-form-field', viewModel: 'free-form-field',
        propName: 'docPricingNotes',
        default: '###Enter pricing notes in markdown'
    },
];

var implementation = [
    {
        fieldDescription: 'Select AWS Resources',
        fieldType: "resource-group",
        propName: 'docProposedAWSServices',
        viewModel: 'resource-group',
        prePopulate: true,
        prePopulateFromDoc: 'sdd',
        prePopulateFromField: 'docProposedAWSServices'
    },
];

exports.pd = pd;
exports.times = times;
exports.resources = resources;
exports.hld = hld;
exports.initialPricing = initialPricing;
exports.initialApproval = initialApproval;
exports.dd = dd;
exports.finalPricing = finalPricing;
exports.implementation = implementation;