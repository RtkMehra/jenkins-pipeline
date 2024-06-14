export class CreateNoteDto {
    readonly title: string;
    readonly tagline: string;
    readonly body: string;
    readonly pinned?: boolean;
  }
  