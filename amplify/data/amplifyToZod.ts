import { z } from 'zod';
import { ModelField } from '@aws-amplify/datastore';

export function createZodSchema(schemaMap: Record<string, ModelField>) {
    let schemaObject: { [key: string]: z.ZodTypeAny } = {};
    for (const key in schemaMap) {
        const field = schemaMap[key];
        let baseType: z.ZodTypeAny;
        if (typeof field.type === 'string') {
            switch (field.type) {
                case 'ID':
                case 'String':
                case 'AWSJSON':
                case 'AWSURL':
                    baseType = z.string();
                    break;
                case 'Boolean':
                    baseType = z.boolean();
                    break;
                case 'Float':
                case 'Int':
                    baseType = z.number();
                    break;
                default:
                    throw new Error(`Unsupported type: ${field.type}`);
            }
        } else if (typeof field.type === 'object' && 'model' in field.type) {
            baseType = z.string();
        } else {
            throw new Error(`Unsupported field type structure: ${JSON.stringify(field.type)}`);
        }
        if (field.isArray) {
            baseType = z.array(baseType);
            if (field.hasOwnProperty('isArrayNullable') && field.isArrayNullable) {
                baseType = z.optional(baseType);
            }
        }
        const fieldSchema = z.object({
            objectField: z.string().optional(),
            defaultValue: field.isRequired ? baseType.optional() : baseType
        }).refine(data => {
            if (field.isRequired && !data.objectField && data.defaultValue === undefined) {
                return false;
            }
                return true;
            }, 
            {
                message: "defaultValue must be provided if objectField is empty and the field is required."
            }
        );
        schemaObject[field.name] = fieldSchema;
    }
    return z.object(schemaObject);
}