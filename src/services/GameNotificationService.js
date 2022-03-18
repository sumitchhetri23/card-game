import toastr from 'toastr';

toastr.options.progressBar = true;
toastr.options.positionClass = "mt-2 toast-top-center";

class GameNotificationService {

    static success = (message, title = null, time_out = 2000, progress_bar = true) => {
        toastr.success(message, title, {
            timeOut: time_out,
            progressBar: progress_bar
        });
    };

    static error = (message, title = null, time_out = 2000, progress_bar = true) => {
        toastr.error(message, title, {
            timeOut: time_out,
            progressBar: progress_bar
        });
    };

    static info = (message, title = null, time_out = 2000, progress_bar = true) => {
        toastr.info(message, title, {
            timeOut: time_out,
            progressBar: progress_bar
        });
    };

    static warning = (message, title = null, timeOut = 1500, progressBar = true) => {
        toastr.warning(message, title, {
            timeOut: timeOut,
            progressBar: progressBar
        });
    };
}

export default GameNotificationService;