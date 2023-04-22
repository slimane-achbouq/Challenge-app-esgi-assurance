import { useCallback, useEffect, useState } from "react";

import { httpGetUserInfo } from "./requests";

function useUserInfo() {
    const [userInfo, saveAUserInfo] = useState([]);

    const getAllUserInfo = useCallback(async () => {
        const infos = await httpGetUserInfo();
        const fetchedInfos = await infos.json();
        saveAUserInfo(fetchedInfos);
    }, []);

    useEffect(() => {
        getAllUserInfo();
    }, [getAllUserInfo]);

    if (userInfo.length === undefined) {
        var user = userInfo.user;
        localStorage.setItem('user-mail', user.email);
    }
    return userInfo;
}

export default useUserInfo;