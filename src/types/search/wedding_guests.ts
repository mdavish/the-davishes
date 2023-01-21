export interface Address {
	line1?: string,
	line2?: string,
	line3?: string,
	sublocality?: string,
	city?: string,
	region?: string,
	postalCode?: string,
	extraDescription?: string,
	countryCode?: string,
}

export interface Coordinate {
	latitude?: number,
	longitude?: number,
}

export interface EntityReference {
	entityId: string,
	name: string,
}

export interface C_plusOneDetails {
	firstName: string,
	lastName: string,
	email?: string,
	phone?: string,
}

export enum C_rSVPStatus {
	ATTENDING = "Attending",
	NOT_ATTENDING = "Not Attending",
}

export enum C_side {
	MAX = "Max",
	ASHLEY = "Ashley",
}

export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export default interface Ce_weddingGuest {
	address?: Address,
	name: string,
	cityCoordinate?: Coordinate,
	c_guestEmail?: string,
	c_hasPlusOne?: boolean,
	c_intents?: string[],
	c_nAttendingRehearsalDinner?: number,
	c_nAttendingWedding?: number,
	c_nAttendingWelcomeDrinks?: number,
	c_notes?: string,
	c_plusOne?: EntityReference[],
	c_plusOneDetails?: C_plusOneDetails,
	c_rSVPStatus?: C_rSVPStatus,
	c_side?: C_side,
	displayCoordinate?: Coordinate,
	dropoffCoordinate?: Coordinate,
	firstName?: string,
	geocodedCoordinate?: Coordinate,
	headshot?: Image,
	lastName?: string,
	mainPhone?: any,
	pickupCoordinate?: Coordinate,
	routableCoordinate?: Coordinate,
	id: string,
	walkableCoordinate?: Coordinate,
	yextDisplayCoordinate?: Coordinate,
	yextDropoffCoordinate?: Coordinate,
	yextPickupCoordinate?: Coordinate,
	yextRoutableCoordinate?: Coordinate,
	yextWalkableCoordinate?: Coordinate,
}
