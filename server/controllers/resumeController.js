import imageKit from "../config/imageKit.js";
import Resume from "../models/Resume.js";
import fs from 'fs'

export const createresume = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.body;

        const newResume = await Resume.create({
            userId,
            title
        })
        return res.status(201).json({
            message: "Resume created successfully",
            resume: newResume
        }

        )
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

// for delete resume
export const deleteresume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        await Resume.findOneAndDelete({ userId, _id: resumeId })
        return res.status(200).json({
            message: "Resume deleted successfully",
        }

        )
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

// Get user Resume BY Id

export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        const resume = await Resume.findOne({ userId, _id: resumeId })
        if (!resume) {
            return res.status(200).json({
                message: "Resume not found"
            })
        }
        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        return res.status(200).json({ resume })

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}


// get resume by id

export const getPublicResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params;

        const resume = await Resume.findOne({ public: true, _id: resumeId })
        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            })
        }
        return res.status(200).json({ resume })

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

// export const updateResume = async (req, res) => {
//     try {
//         const userId = req.userId;
//         const { resumeId, resumeData, removeBackground } = req.body;
//         const image = req.file;

//         // const resumeDataCopy = JSON.parse(JSON.stringify(resumeData));
//         // const resumeDataCopy = resumeData || {};
//         // if (image) {

//         //     const imageBufferData = fs.createReadStream(image.path)
//         //     const response = await imageKit.files.upload({
//         //         file: imageBufferData,
//         //         fileName: 'resume.png',
//         //         folder: 'user-resumes',
//         //         transformation: {
//         //             pre: 'w-300,h-300,fo-face,z-0.75' + (removeBackground ? ',e-bgremove' : '')
//         //         }
//         //     });

//         //     resumeDataCopy.personal_info.image = response.url;
//         // }
//         // console.log(response);
//         let imageUrl;

//         if (image) {
//             const imageBufferData = fs.createReadStream(image.path);

//             const response = await imageKit.files.upload({
//                 file: imageBufferData,
//                 fileName: 'resume.png',
//                 folder: 'user-resumes',
//                 transformation: {
//                     pre:
//                         'w-300,h-300,fo-face,z-0.75' +
//                         (removeBackground ? ',e-bgremove' : '')
//                 }
//             });

//             imageUrl = response.url;
//         }

//         if (imageUrl) {
//             resumeDataCopy.personal_info = {
//                 ...resumeDataCopy.personal_info,
//                 image: imageUrl
//             };
//         }
//         // const resume = await Resume.findByIdAndUpdate({ userId, _id: resumeId }, resumeDataCopy, { new: true })
//         const resume = await Resume.findOneAndUpdate(
//             { _id: resumeId, userId },
//             { $set: resumeDataCopy },
//             { new: true }
//         );

//         return res.status(200).json({ message: "Saved successfully" })


//     } catch (error) {
//         return res.status(400).json({
//             message: error.message
//         })
//     }
// }
export const updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId, resumeData, removeBackground } = req.body;
        const image = req.file;

        const resumeDataCopy =
            typeof resumeData === "string"
                ? JSON.parse(resumeData)
                : resumeData || {};

        let imageUrl;

        if (image) {
            const imageBufferData = fs.createReadStream(image.path);

            const response = await imageKit.files.upload({
                file: imageBufferData,
                fileName: 'resume.png',
                folder: 'user-resumes',
                transformation: {
                    pre:
                        'w-300,h-300,fo-face,z-0.75' +
                        (removeBackground ? ',e-bgremove' : '')
                }
            });

            imageUrl = response.url;
        }

        if (imageUrl) {
            resumeDataCopy.personal_info = {
                ...(resumeDataCopy.personal_info || {}),
                image: imageUrl
            };
        }

        const updatedResume = await Resume.findOneAndUpdate(
            { _id: resumeId, userId },
            { $set: resumeDataCopy },
            { new: true }
        );

        if (!updatedResume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        return res.status(200).json({
            message: "Saved successfully",
            resume: updatedResume
        });

    } catch (error) {
        console.error("UPDATE ERROR:", error);
        return res.status(500).json({
            message: error.message
        });
    }
};