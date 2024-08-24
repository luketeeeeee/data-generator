import { Request, Response } from 'express'

export const remove = (req: Request, res: Response) => {
	try {
		const { pingReportId } = req.params;

		// implement other delete ping report controller, that deletes them based on a date interval
		// it'll be pretty cool

    

	} catch (error) {
		return res.status(500).json({
      success: true,
      message: { error: (error as Error).message },
    });
	}
}