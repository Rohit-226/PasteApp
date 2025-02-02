import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get('pasteId');
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);
    const navigate = useNavigate();

    // Populate form fields if pasteId exists
    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            if (paste) {
                setTitle(paste.title);
                setValue(paste.content);
            } else {
                console.warn(`Paste with ID ${pasteId} not found!`);
                setTitle('');
                setValue('');
                // Optionally navigate to another page if paste not found
                // navigate('/');
            }
        } else {
            setTitle('');
            setValue('');
        }
    }, [pasteId, allPastes, navigate]); // Re-run when pasteId or allPastes changes

    function createPaste() {
        const paste = {
            title, // Shorthand property names
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };

        if (pasteId) {
            dispatch(updateToPastes(paste)); // Update the paste
        } else {
            dispatch(addToPastes(paste)); // Create a new paste
            // Optionally: navigate to the newly created paste URL
            // navigate(`/?pasteId=${paste._id}`);
        }

        // Reset form fields and URL parameters after creation or update
        setTitle('');
        setValue('');
        setSearchParams(null); // Clear search params from URL
    }

    return (
        <div>
            <div className="flex flex-row gap-7 place-content-between">
                <input
                    className="p-1 rounded-2xl mt-2 w-[66%] pl-4"
                    type="text"
                    placeholder="Enter title here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button onClick={createPaste} className="p-2 rounded-2xl mt-2">
                    {pasteId ? 'Update My Paste' : 'Create My Paste'}
                </button>
            </div>

            <div>
                <textarea
                    className="rounded-2xl mt-4 min-w-[500px] p-4"
                    value={value}
                    placeholder="Enter content here"
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                />
            </div>
        </div>
    );
};

export default Home;
