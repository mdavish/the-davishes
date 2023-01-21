export interface Time {
	start?: any,
	end?: any,
}

export interface EntityReference {
	entityId: string,
	name: string,
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

export default interface Ce_weddingEvent {
	time?: Time,
	description?: string,
	name: string,
	c_eventLocation?: EntityReference[],
	c_eventPhoto?: Image,
	c_intents?: string[],
	c_recommendedAttire?: string,
	id: string,
}
