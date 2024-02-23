import toastr from "toastr";
import {
    NOT_STARTED,
    STARTED,
    COMPLETED,
    WILL_NOT_COMPLETE
} from "../common/constants";

export const clientApprovalStatusColor = {
    0: "yellow",
    1: "green",
    2: "red"
};

export const contractStatusColor = {
    [NOT_STARTED]: "yellow",
    [STARTED]: "grey",
    [COMPLETED]: "green",
    [WILL_NOT_COMPLETE]: "red"
};

export const displayNotification = (
    alert = "success",
    title,
    message,
    options
) => {
    const toastrOptions = {
        closeButton: true,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-center",
        preventDuplicates: false,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn"
    };

    toastr.options = { ...toastrOptions, ...options };

    return toastr[alert](title, message);
};
