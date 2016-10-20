import { Base64 } from 'js-base64';
import { RawMailParser } from '../models/raw-mail-parser';
import { OutgoingMail } from '../models/outgoing-mail';

export class MailHelper {

    constructor() { }

    public getHeader(headers: Array<any>, index: string): string {
        var header = '';
        for (var i in headers) {
            if (headers[i].name === index) {
                header = headers[i].value;
            }
        }
        return header;
    }

    public getBody(message: RawMailParser): string {
        var encodedBody = '';
        if (typeof message.parts === 'undefined') {
            encodedBody = message.body.data;
        } else {
            encodedBody = this.getHTMLPart(message.parts);
        }
        encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
        // escape function is used for special characters
        return atob(encodedBody);
    }

    public getHTMLPart(parts: Array<any>): string {
        for (var i = 0; i <= parts.length; i++) {
            if (typeof parts[i].parts === 'undefined') {
                if (parts[i].mimeType === 'text/html') {
                    return parts[i].body.data;
                }
            } else {
                return this.getHTMLPart(parts[i].parts);
            }
        }
        return '';
    }

    public encodeEmailData(data: OutgoingMail, user: any): string {
        let message = this.createMailString(data, user);

        // return btoa(message).replace(/\+/g, '-').replace(/\//g, '_');
        return Base64.encodeURI(message);
    }

    private createMailString(mail: OutgoingMail, user: any): string {
        let rowDelimiter = '\r\n';
        let contentType = 'Content-Type: text/plain; charset=utf-8';
        let mime = 'MIME-Version: 1.0';
        let content = mail.body;
        let retVal = '';
        // let i = 0;
        // while (i < mail.to.length) {
        //     retVal = retVal.concat('to: ', mail.to[i]).concat(rowDelimiter);
        //     i++;
        // }
        // i = 0;
        // while (i < mail.cc.length) {
        //     retVal = retVal.concat('cc: ', mail.cc[i]).concat(rowDelimiter);
        //     i++;
        // }
        // i = 0;
        // while (i < mail.bcc.length) {
        //     retVal = retVal.concat('bcc: ', mail.bcc[i]).concat(rowDelimiter);
        //     i++;
        // }

        retVal = retVal.concat('To: ', mail.to).concat(rowDelimiter);
        retVal = retVal.concat('Cc: ', mail.cc).concat(rowDelimiter);
        retVal = retVal.concat('Bcc: ', mail.bcc).concat(rowDelimiter);

        retVal = retVal.concat('From: ', user.emails[0].value).concat(rowDelimiter);
        retVal = retVal.concat('Subject: ', mail.subject).concat(rowDelimiter);
        retVal = retVal.concat(contentType).concat(rowDelimiter);
        retVal = retVal.concat(mime).concat(rowDelimiter);
        retVal = retVal.concat(rowDelimiter).concat(content);

        return retVal;
    }
}