import React, { useState } from 'react';
import axios from 'axios';

interface GridProps {
  grid?: any;
  refreshGrids: () => void;
}

interface FileState {
  mainImage?: File;
  topRightImage?: File;
  bottomLeftImage?: File;
  bottomRightImage?: File;
}

interface FormData {
  main: { title: string; tagline: string; productLink: string };
  topRight: { title: string; tagline: string; productLink: string };
  bottomLeft: { title: string; tagline: string; productLink: string };
  bottomRight: { title: string; tagline: string; productLink: string };
}

export const GridForm: React.FC<GridProps> = ({ grid, refreshGrids }) => {
  const initialFormData = {
    main: { title: '', tagline: '', productLink: '' },
    topRight: { title: '', tagline: '', productLink: '' },
    bottomLeft: { title: '', tagline: '', productLink: '' },
    bottomRight: { title: '', tagline: '', productLink: '' },
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [files, setFiles] = useState<FileState>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, section: keyof FormData) => {
    const { name, type, files: fileList, value } = e.target;
    if (type === 'file') {
      setFiles({
        ...files,
        [name]: fileList ? fileList[0] : undefined
      });
    } else {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [name]: value
        }
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((section) => {
      const details = formData[section as keyof FormData];
      data.append(`${section}Title`, details.title);
      data.append(`${section}Tagline`, details.tagline);
      data.append(`${section}ProductLink`, details.productLink);
    });

    Object.keys(files).forEach(key => {
      if (files[key as keyof FileState]) {
        data.append(key, files[key as keyof FileState]!);
      }
    });

    try {
      if (grid) {
        await axios.patch(`http://localhost:3000/api/grids/${grid._id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await axios.post('http://localhost:3000/api/grids', data, {
          headers: {
            'Content-Type': 'multipart/form/data'
          }
        });
      }
      refreshGrids();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-5 bg-[#020817] rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 space-y-2 p-2">
          <label className="block text-white text-sm font-bold mb-2">
            Main Image (Left)
          </label>
          <input
            type="file"
            name="mainImage"
            onChange={(e) => handleInputChange(e, 'main')}
            className="block w-full text-sm text-white-500
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            required={!grid}
          />
          <input
            type="text"
            name="title"
            value={formData.main.title}
            onChange={(e) => handleInputChange(e, 'main')}
            placeholder="Title"
            className="input input-bordered w-full mt-2 p-2 border-white border-2"
            required
          />
          <input
            type="text"
            name="tagline"
            value={formData.main.tagline}
            onChange={(e) => handleInputChange(e, 'main')}
            placeholder="Tagline"
            className="input input-bordered w-full mt-2 p-2 border-2"
          />
          <input
            type="url"
            name="productLink"
            value={formData.main.productLink}
            onChange={(e) => handleInputChange(e, 'main')}
            placeholder="Product Link"
            className="input input-bordered w-full mt-2 p-2 border-2"
          />
        </div>
        {/* Right Images Section */}
        <div className="w-full md:w-1/2 space-y-2 p-2">
          <div className="space-y-2">
            <label className="block text-white-700 text-sm font-bold mb-2">
              Top Right Image
            </label>
            <input
              type="file"
              name="topRightImage"
              onChange={(e) => handleInputChange(e, 'topRight')}
              className="block w-full text-sm text-white-500
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
              required={!grid}
            />
            <input
              type="text"
              name="title"
              value={formData.topRight.title}
              onChange={(e) => handleInputChange(e, 'topRight')}
              placeholder="Title"
              className="input input-bordered w-full mt-2 p-2 border-2"
            />
            <input
              type="text"
              name="tagline"
              value={formData.topRight.tagline}
              onChange={(e) => handleInputChange(e, 'topRight')}
              placeholder="Tagline"
              className="iinput input-bordered w-full mt-2 p-2 border-2"
            />
            <input
              type="url"
              name="productLink"
              value={formData.topRight.productLink}
              onChange={(e) => handleInputChange(e, 'topRight')}
              placeholder="Product Link"
              className="input input-bordered w-full mt-2 p-2 border-2"
            />
          </div>
          {/* Bottom Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-white-700 text-sm font-bold mb-2">
                Bottom Left Image
              </label>
              <input
                type="file"
                name="bottomLeftImage"
                onChange={(e) => handleInputChange(e, 'bottomLeft')}
                className="block w-full text-sm text-white-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                required={!grid}
              />
              <input
                type="text"
                name="title"
                value={formData.bottomLeft.title}
                onChange={(e) => handleInputChange(e, 'bottomLeft')}
                placeholder="Title"
                className="input input-bordered w-full mt-2 p-2 border-2"
              />
              <input
                type="text"
                name="tagline"
                value={formData.bottomLeft.tagline}
                onChange={(e) => handleInputChange(e, 'bottomLeft')}
                placeholder="Tagline"
                className="input input-bordered w-full mt-2 p-2 border-2"
              />
              <input
                type="url"
                name="productLink"
                value={formData.bottomLeft.productLink}
                onChange={(e) => handleInputChange(e, 'bottomLeft')}
                placeholder="Product Link"
                className="input input-bordered w-full mt-2 p-2 border-2"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-white-700 text-sm font-bold mb-2">
                Bottom Right Image
              </label>
              <input
                type="file"
                name="bottomRightImage"
                onChange={(e) => handleInputChange(e, 'bottomRight')}
                className="block w-full text-sm text-white-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                required={!grid}
              />
              <input
                type="text"
                name="title"
                value={formData.bottomRight.title}
                onChange={(e) => handleInputChange(e, 'bottomRight')}
                placeholder="Title"
                className="input input-bordered w-full mt-2 p-2 border-2"
              />
              <input
                type="text"
                name="tagline"
                value={formData.bottomRight.tagline}
                onChange={(e) => handleInputChange(e, 'bottomRight')}
                placeholder="Tagline"
                className="input input-bordered w-full mt-2 p-2 border-2"
              />
              <input
                type="url"
                name="productLink"
                value={formData.bottomRight.productLink}
                onChange={(e) => handleInputChange(e, 'bottomRight')}
                placeholder="Product Link"
                className="input input-bordered w-full mt-2 p-2 border-2"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full mt-4">
          {grid ? 'Update Grid' : 'Create Grid'}
        </button>
      </form>
    </div>
  );
};
