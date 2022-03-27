const pridobiNapovedAPI = (req, res) => {
    const zgodovinskiPodatki = req.body.podatki;
    var stHigh = 0;
    var stLow = 0;
    var high = 0;
    var low = 0;

    for (let i in zgodovinskiPodatki) {
        if (zgodovinskiPodatki.hasOwnProperty(i)) {
            if (zgodovinskiPodatki[i].high) {
                high += zgodovinskiPodatki[i].high;
                stHigh++;
            }
            if (zgodovinskiPodatki[i].low) {
                low += zgodovinskiPodatki[i].low;
                stLow++;
            }
        }
    }
    if (stHigh !== 0)
        high = high / stHigh;
    if (stLow !== 0)
        low = low / stLow;

    res.status(200).json({
        high: high,
        low: low
    });
};

module.exports = pridobiNapovedAPI;
