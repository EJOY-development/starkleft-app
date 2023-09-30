import { useContext, useEffect, useState } from "react";
import "./Login.scss";
import SocketContext from "../contexts/SocketContext";
import sha256 from "sha256";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/AuthSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignin, setSignin] = useState(true);

  const onSignupComplete = () => {
    window.alert(`회원가입되었습니다!`);
    setSignin(true);
  };

  return (
    <div className="login page">
      <div className="form">
        <div className="options">
          <div className={"option" + (isSignin ? " active" : "")} onClick={(e) => setSignin(true)}>
            로그인
          </div>
          <div className={"option" + (isSignin ? "" : " active")} onClick={(e) => setSignin(false)}>
            회원가입
          </div>
        </div>
        <div className="panel">{isSignin ? <SigninPanel /> : <SignUpPanel onComplete={onSignupComplete} />}</div>
      </div>
    </div>
  );
};

const SigninPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const [idInput, setIdInput] = useState("");
  const [pwInput, setPwInput] = useState("");

  const tryLogin = () => {
    if (idInput.length === 0) {
      window.alert("아이디를 입력해주세요!");
      return;
    }
    if (pwInput.length === 0) {
      window.alert("비밀번호를 입력해주세요!");
      return;
    }
    socket?.emit("signin", {
      id: idInput,
      credential: sha256(idInput + sha256(pwInput)),
    });
  };

  useEffect(() => {
    const onSignin = (success: boolean, token: any) => {
      if (success) {
        dispatch(setAuth({ accessToken: token.accessToken, refreshToken: token.refreshToken, uid: token.uid, nickname: token.nickname }));
        navigate("/");
      } else {
        window.alert(`아이디 또는 비밀번호가 틀렸습니다.`);
      }
    };

    socket?.on("signin", onSignin);
    return () => {
      socket?.off("signin", onSignin);
    };
  }, []);

  return (
    <div className="inner-form">
      <div className="form-content">
        <div className="form-data">
          <div className="label">아이디</div>
          <input spellCheck={false} value={idInput} onChange={(e) => setIdInput(e.target.value)} />
        </div>
        <div className="form-data">
          <div className="label">비밀번호</div>
          <input
            type={"password"}
            spellCheck={false}
            value={pwInput}
            onChange={(e) => setPwInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") tryLogin();
            }}
          />
        </div>
      </div>
      <button className="submit" onClick={tryLogin}>
        로그인
      </button>
    </div>
  );
};

const SignUpPanel = ({ onComplete }: any) => {
  const socket = useContext(SocketContext);

  const [idInput, setIdInput] = useState("");
  const [nicknameInput, setNicnameInput] = useState("");
  const [pwInput, setPwInput] = useState("");
  const [pwConfirmInput, setPwConfirmInput] = useState("");

  const trySignUp = () => {
    if (idInput.length < 5) {
      window.alert("아이디 길이는 5자 이상 입력해주세요!");
      return;
    }
    if (pwInput.length < 5) {
      window.alert("비밀번호 길이는 5자 이상 입력해주세요!");
      return;
    }
    if (nicknameInput.length < 1) {
      window.alert("닉네임 길이는 1자 이상 입력해주세요!");
      return;
    }
    if (pwInput !== pwConfirmInput) {
      window.alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    socket?.emit("signup", {
      id: idInput,
      credential: sha256(idInput + sha256(pwInput)),
      nickname: nicknameInput,
    });
  };

  useEffect(() => {
    const onSignup = (success: boolean) => {
      if (success) onComplete();
      else {
        window.alert(`회원가입 도중 오류가 발생했습니다!`);
      }
    };

    socket?.on("signup", onSignup);
    return () => {
      socket?.off("signup", onSignup);
    };
  }, []);

  return (
    <div className="inner-form">
      <div className="form-content">
        <div className="form-data">
          <div className="label">아이디</div>
          <input spellCheck={false} value={idInput} onChange={(e) => setIdInput(e.target.value)} />
        </div>
        <div className="form-data">
          <div className="label">닉네임</div>
          <input spellCheck={false} value={nicknameInput} onChange={(e) => setNicnameInput(e.target.value)} />
        </div>
        <div className="form-data">
          <div className="label">비밀번호</div>
          <input type={"password"} spellCheck={false} value={pwInput} onChange={(e) => setPwInput(e.target.value)} />
        </div>
        <div className="form-data">
          <div className="label">비밀번호 확인</div>
          <input
            type={"password"}
            spellCheck={false}
            value={pwConfirmInput}
            onChange={(e) => setPwConfirmInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") trySignUp();
            }}
          />
        </div>
      </div>
      <button className="submit" onClick={trySignUp}>
        회원가입
      </button>
    </div>
  );
};

export default Login;
