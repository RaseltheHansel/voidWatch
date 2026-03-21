import { NextRequest, NextResponse} from "next/server";
import { prisma } from '@/lib/prisma';


// PATCH - resolve, ignore, unresolve an error
export async function PATCH(
    req: NextRequest,
    { params }: {params: {id: string} }
) {
    const { status } = await req.json();

    const error = await prisma.error.update({
        where: { id: params.id },
        data: { status },
    });
    return NextResponse.json(error);
}
// DELETE - delete an error 
export async function DELETE(
    _req: NextRequest,
    { params }: { params: { id: string }}
) {
    await prisma.error.delete({where: {id: params.id} });
    return NextResponse.json({message: 'Deleted'});
}

