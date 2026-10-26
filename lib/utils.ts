export { cn } from "cn"

// Convert prisma object into a regular JS object
export function convertToPlainObject<T>(value: T): T{
    return JSON.parse(JSON.stringify(value));
}

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
    const [int, decimal] = num.toString().split('.');
    return decimal ? `${int}.${decimal.padEnd(2,'0')}` : `${int}.00`;
}

// Format Errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formatError(error: any) {
    if(error.name === 'ZodError') {
        // Handle Zod Error
        const fieldErrors = error.issues.map((issue: { message: string }) => issue.message);

        return fieldErrors.join('\n');
    } else if (error.name === 'PrismaClientKnownRequestError' && error.code === 'P2002') {
        // Handle Prisma error
        const meta = error.meta;
        const fields =
            meta?.target ??
            meta?.driverAdapterError?.cause?.constraint?.fields;

        const field: string = Array.isArray(fields) && fields.length ? fields[0] : 'Field';
        return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`;

    } else {
        // Handle Other error
        return typeof error.message === 'string' ? error.message : JSON.stringify(error.message);
    }
}