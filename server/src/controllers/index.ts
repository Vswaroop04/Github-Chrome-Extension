import { Request, Response } from 'express';

export const index = (req: Request, res: Response) => {
	res.status(200).json({
		message: "Vishnu's Github Chrome Extension Backend is Running :>>>>>>>>>>>>>",
	});
};

export default index;
