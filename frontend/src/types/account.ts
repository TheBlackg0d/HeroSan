type AccountProfile = {
	uid: string;
	role: string;
	fullName: string;
	handle: string;
	email: string;
	emailVerified: boolean;
	avatarUrl?: string;
	timezone: string;
	shell: string;
	workspace: string;
};

type SelectOption = {
	value: string;
	label: string;
};

type PasswordStrength = {
	label: string;
	filledSegments: number;
	totalSegments: number;
};

type SessionKind = "browser" | "mobile" | "cli";

type AccountSession = {
	id: string;
	kind: SessionKind;
	title: string;
	tag?: string;
	current?: boolean;
	ip: string;
	location?: string;
	lastSeen: string;
	detailLabel: string;
	detailValue: string;
	token?: string;
	actionLabel: string;
};

type AccountSettingsData = {
	profile: AccountProfile;
	timezones: SelectOption[];
	shells: SelectOption[];
	passwordLastChanged: string;
	passwordStrength: PasswordStrength;
	sessions: AccountSession[];
};
