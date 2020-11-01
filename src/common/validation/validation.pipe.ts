import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) {}

    transform(value: any, metadata: ArgumentMetadata) {
        const result = this.schema.validate(value);

        if (result.error) {
            throw new HttpException({
                message: 'Validation failed',
                detail: result.error.message.replace(/"/g, '\''),
                statusCode: HttpStatus.BAD_REQUEST
            }, HttpStatus.BAD_REQUEST);
        }

        return result.value;
    }
}
