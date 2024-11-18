document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM is ready, jQuery is:", typeof $);

    if (typeof $ !== "undefined") {
        $('#searchInput').on('keyup', function () {
            var query = $(this).val();
            if (query.trim() === "") {
                $('#resultsList').empty();
                return;
            }

            $.ajax({
                url: '', // Endpoint actual
                data: { 'q': query },
                dataType: 'json',
                success: function (data) {
                    $('#resultsList').empty();
                    if (data.results.length > 0) {
                        $.each(data.results, function (index, certificate) {
                            $('#resultsList').append(`
                                <details class="mb-3">
                                    <summary class="text-white">
                                        ${certificate.national_id} - ${certificate.holder_first_name} - ${certificate.holder_last_name} - ${certificate.course}
                                    </summary>
                                    <div class="table-responsive">
                                        <table class="table table-bordered text-center w-100" style="background-color: #140c24; color: white;">
                                            <tr>
                                                <td class="px-2 py-1">National ID</td>
                                                <td class="px-2 py-1">${certificate.national_id}</td>
                                            </tr>
                                            <tr>
                                                <td class="px-2 py-1">Name</td>
                                                <td class="px-2 py-1">${certificate.holder_first_name} ${certificate.holder_last_name}</td>
                                            </tr>
                                            <tr>
                                                <td class="px-2 py-1">Institution</td>
                                                <td class="px-2 py-1">${certificate.institution}</td>
                                            </tr>
                                            <tr>
                                                <td class="px-2 py-1">Start Date</td>
                                                <td class="px-2 py-1">${certificate.start_date}</td>
                                            </tr>
                                            <tr>
                                                <td class="px-2 py-1">End Date</td>
                                                <td class="px-2 py-1">${certificate.end_date}</td>
                                            </tr>
                                            <tr>
                                                <td class="px-2 py-1">Hours</td>
                                                <td class="px-2 py-1">${certificate.hours}</td>
                                            </tr>
                                            <tr>
                                                <td class="px-2 py-1">Certificate Code</td>
                                                <td class="px-2 py-1">${certificate.certificate_code}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </details>
                            `);
                        });

                        $('#resultsList details').on('toggle', function () {
                            if (this.open) {
                                $('#resultsList details').not(this).removeAttr('open');
                            }
                        });
                    } else {
                        $('#resultsList').append('<p class="text-warning text-center">No results found</p>');
                    }
                },
                error: function (xhr, status, error) {
                    console.error(`Error fetching results: ${error}`);
                }
            });
        });
    } else {
        console.error("jQuery is not loaded!");
    }
});
