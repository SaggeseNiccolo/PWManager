import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../src/firebase";
import { generatePassword } from "../passwordGenerator";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import Spinner from "./Spinner";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  const [length, setLength] = useState();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUsername(user.displayName);
        getPass();

        onSnapshot(collection(db, "users"), (snapshot) => {
          const data = snapshot.docs
            .filter((doc) => doc.data().uid === user.uid)
            .map((doc) => doc.data());
          setPasswords(data);
          setLoading(false);
        });
      } else {
        navigate("/login");
      }
    });
  }, []);

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };

  const pushPassword = async () => {
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: name,
      password: password,
    });

    setPassword("");
    setName("");
  };

  const getPass = async () => {
    const a = await onSnapshot(collection(db, "users"), (snapshot) => {
      const data = snapshot.docs
        .filter((doc) => doc.data().uid === user.uid)
        .map((doc) => doc.data());
      setPasswords(data);
    });
  };

  return (
    <div>
      {loading ? (
        <div className="flex flex-1 bg-gray-800 text-gray-200 h-screen items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-1 bg-gray-800 text-gray-100 h-screen items-center justify-center flex-col">
          <button
            className="bg-red-600 hover:bg-red-700 font-semibold text-white rounded-xl transition-all hover:rounded-3xl py-2 px-4 fixed right-4 top-4"
            onClick={logOut}
          >
            Log out
          </button>
          <div className="text-4xl my-4">Benvenuto {username}!</div>
          <div className="flex flex-1 flex-col justify-center">
            <div className="p-2 text-xl font-semibold text-center">
              Genera password
            </div>
            <div className="text-black">
              <input
                className="p-2 m-2 rounded placeholder:text-gray-600"
                type="text"
                name="name"
                placeholder="Nome"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              {/* <input
                className="p-2 m-2 rounded w-16"
                type="number"
                name="length"
                min={8}
                max={16}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              /> */}
              <select
                name="length"
                className="p-2 w-28 rounded"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              >
                <option defaultChecked className="text-gray-600">
                  Lunghezza
                </option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
              </select>
              <button
                className="p-2 m-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all hover:rounded-3xl"
                onClick={() => {
                  setPassword(generatePassword(length));
                }}
              >
                Genera
              </button>
            </div>
            {password.length > 0 && name.length > 0 && (
              <div className="text-center font-semibold text-xl">
                {password}
                <button
                  className="p-2 m-2 rounded-xl bg-green-600 hover:bg-green-700 text-white transition-all hover:rounded-3xl"
                  onClick={pushPassword}
                >
                  Salva
                </button>
              </div>
            )}
            <div className="bg-gray-700 rounded-xl mt-4 max-h-96 scrollbar overflow-y-auto">
              {passwords.map((password) => {
                return (
                  <div
                    className="grid grid-cols-2 text-center bg-gray-900 rounded-xl m-4 hover:bg-gray-800 transition-all hover:motion-safe:scale-105 hover:-translate-y-1 cursor-pointer"
                    key={password.password}
                  >
                    <div className="p-2 m-2">{password.name}</div>
                    <div className="p-2 m-2">{password.password}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
