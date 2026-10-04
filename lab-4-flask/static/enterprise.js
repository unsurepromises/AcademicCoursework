/**
 * NEXUSNODE™ ENTERPRISE PRO MAX — CLIENT ENGINE
 * SOC-2 Type II Certified Quantum Pointer Orchestration Script
 */

(function () {
    'use strict';

    // --- Toast System ---
    function createToastContainer() {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        return container;
    }

    function showToast(title, desc, icon = '⚡', duration = 4500) {
        const container = createToastContainer();
        const toast = document.createElement('div');
        toast.className = 'toast';
        const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });

        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-body">
                <div class="toast-title">${title}</div>
                <div class="toast-desc">${desc}</div>
                <div class="toast-time">T+0.00ms // ${timestamp} // US-EAST-1</div>
            </div>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, duration);
    }

    // --- Telemetry Dashboard Live Updates ---
    function initTelemetry() {
        const mopsEl = document.getElementById('telemetry-mops');
        const heapEl = document.getElementById('telemetry-heap');
        const gcEl = document.getElementById('telemetry-gc');

        let secondsUntilGc = 254;

        setInterval(() => {
            // Fluctuate Throughput around 14.2 Mops/s
            if (mopsEl) {
                const base = 14.2;
                const jitter = (Math.random() * 1.8 - 0.9).toFixed(2);
                const current = (base + parseFloat(jitter)).toFixed(2);
                mopsEl.textContent = `${current} Mops/s`;
            }

            // Heap jitter
            if (heapEl) {
                const heap = (42.8 + Math.random() * 0.4).toFixed(2);
                heapEl.textContent = `${heap} GB / 128 TB`;
            }

            // GC countdown
            if (gcEl) {
                secondsUntilGc--;
                if (secondsUntilGc <= 0) secondsUntilGc = 300;
                const mins = String(Math.floor(secondsUntilGc / 60)).padStart(2, '0');
                const secs = String(secondsUntilGc % 60).padStart(2, '0');
                gcEl.textContent = `IDLE (${mins}:${secs})`;
            }
        }, 1800);
    }

    // --- Form Submissions: 800ms Fake Loading & Sequential Toasts ---
    function initFormInterceptors() {
        const forms = document.querySelectorAll('form[action*="linkedlist"]');
        const overlay = document.getElementById('cyberLoadingOverlay');
        const loadingSub = document.getElementById('cyberLoadingSub');

        forms.forEach(form => {
            form.addEventListener('submit', function (e) {
                e.preventDefault();

                const actionInput = form.querySelector('input[name="action"]');
                const actionType = actionInput ? actionInput.value : 'mutation';

                // Display loading overlay
                if (overlay) {
                    if (loadingSub) {
                        if (actionType === 'add') {
                            loadingSub.textContent = 'ALLOCATING HEAP POINTER BLOCK // O(N) TRAVERSAL IN PROGRESS...';
                        } else if (actionType === 'delete') {
                            loadingSub.textContent = 'EXECUTING ZERO-TRUST GARBAGE DEALLOCATION...';
                        } else {
                            loadingSub.textContent = 'CATASTROPHIC HEAP PURGE INITIATED // NULLIFYING HEAD...';
                        }
                    }
                    overlay.classList.add('active');
                }

                // Random transaction hash
                const txHash = '0x' + Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('') + '...' + Array.from({ length: 4 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

                // Fire Required Over-the-Top Toasts
                showToast('Payload Dispatched', `Transaction ID: ${txHash} broadcasted to 0 nodes.`, '🚀', 4000);

                setTimeout(() => {
                    showToast('Pointer Integrity Verified', 'SOC-2 Type II cryptographic checksum matches quantum ledger.', '🔒', 4000);
                }, 280);

                setTimeout(() => {
                    showToast('State Synced Across 0 Availability Zones', 'Cluster consensus quorum achieved via speculative execution.', '⚡', 4000);
                }, 550);

                // Set session storage to celebrate upon reload
                try {
                    sessionStorage.setItem('nexus_last_op', actionType);
                    sessionStorage.setItem('nexus_tx_hash', txHash);
                } catch (err) {
                    // Ignore storage errors
                }

                // Execute actual form submission after 800ms
                setTimeout(() => {
                    HTMLFormElement.prototype.submit.call(form);
                }, 820);
            });
        });
    }

    // Check post-mutation celebration toast
    function checkPostMutationToast() {
        try {
            const lastOp = sessionStorage.getItem('nexus_last_op');
            const tx = sessionStorage.getItem('nexus_tx_hash') || '0x4f8e...91b2';
            if (lastOp) {
                sessionStorage.removeItem('nexus_last_op');
                sessionStorage.removeItem('nexus_tx_hash');

                setTimeout(() => {
                    showToast(
                        'Consensus Finalized',
                        `Operation '${lastOp.toUpperCase()}' committed into distributed heap graph in 814ms [${tx}].`,
                        '✅',
                        5000
                    );
                }, 300);
            }
        } catch (e) {
            // Storage unavailable
        }
    }

    // --- Modal Management ---
    function initModals() {
        // Upgrade Modal
        const upgradeModal = document.getElementById('upgradeModal');
        const upgradeBtns = document.querySelectorAll('.trigger-upgrade-modal');
        const upgradeCloseBtn = document.getElementById('upgradeCloseBtn');
        const upgradeForm = document.getElementById('fakeUpgradeForm');

        function openUpgradeModal(e) {
            if (e) e.preventDefault();
            if (upgradeModal) upgradeModal.classList.add('open');
        }

        function closeUpgradeModal() {
            if (upgradeModal) upgradeModal.classList.remove('open');
        }

        upgradeBtns.forEach(btn => btn.addEventListener('click', openUpgradeModal));
        if (upgradeCloseBtn) upgradeCloseBtn.addEventListener('click', closeUpgradeModal);

        if (upgradeModal) {
            upgradeModal.addEventListener('click', (e) => {
                if (e.target === upgradeModal) closeUpgradeModal();
            });
        }

        if (upgradeForm) {
            upgradeForm.addEventListener('submit', (e) => {
                e.preventDefault();
                closeUpgradeModal();
                showToast(
                    'Upgrade Order Authorized ($499/mo)',
                    'Sequoia Capital representative dispatched. SLA upgraded to 99.999% pointer uptime.',
                    '💎',
                    6000
                );
            });
        }

        // Compliance Preferences Modal
        const prefModal = document.getElementById('compliancePrefModal');
        const openPrefBtn = document.getElementById('btnManageCompliance');
        const closePrefBtn = document.getElementById('prefCloseBtn');
        const savePrefBtn = document.getElementById('btnSavePreferences');

        if (openPrefBtn && prefModal) {
            openPrefBtn.addEventListener('click', () => {
                prefModal.classList.add('open');
            });
        }

        if (closePrefBtn && prefModal) {
            closePrefBtn.addEventListener('click', () => {
                prefModal.classList.remove('open');
            });
        }

        if (savePrefBtn && prefModal) {
            savePrefBtn.addEventListener('click', () => {
                prefModal.classList.remove('open');
                dismissComplianceBanner();
                showToast(
                    'Preferences Synced to NSA/VC Cloud',
                    'All 4,200 non-optional enterprise telemetry trackers locked into persistent heap memory.',
                    '🛰️',
                    5000
                );
            });
        }
    }

    // --- Compliance Banner ---
    function initComplianceBanner() {
        const banner = document.getElementById('complianceBanner');
        const acceptBtn = document.getElementById('btnAcceptCompliance');
        const rejectBtn = document.getElementById('btnRejectCompliance');

        if (localStorage.getItem('nexus_compliance_accepted') === 'true') {
            if (banner) banner.classList.add('hidden');
        }

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                dismissComplianceBanner();
                showToast(
                    '4,200 Trackers Initialized',
                    'Quantum telemetry, neural mouse listeners, and pointer heatmaps successfully activated.',
                    '👁️',
                    5000
                );
            });
        }

        if (rejectBtn) {
            rejectBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showToast(
                    'Action Denied by SOC-2 Policy',
                    'Rejecting trackers violates Section 404 of the VC Investment Agreement. Continuing in compliance mode.',
                    '⚠️',
                    5000
                );
            });
        }
    }

    function dismissComplianceBanner() {
        const banner = document.getElementById('complianceBanner');
        if (banner) {
            banner.classList.add('hidden');
            try {
                localStorage.setItem('nexus_compliance_accepted', 'true');
            } catch (e) {}
        }
    }

    // --- Discount Code Easter Egg ---
    function initCoupon() {
        const couponInput = document.getElementById('discountCodeInput');
        const couponMsg = document.getElementById('discountMessage');
        if (couponInput && couponMsg) {
            couponInput.addEventListener('input', () => {
                const val = couponInput.value.trim().toUpperCase();
                if (val.includes('YC') || val.includes('VC') || val.includes('PROMAX') || val.includes('AI')) {
                    couponMsg.style.display = 'block';
                    couponMsg.textContent = `Promo code "${val}" validated! You saved $0.00049/century.`;
                    couponMsg.style.color = '#00f59b';
                } else if (val.length > 2) {
                    couponMsg.style.display = 'block';
                    couponMsg.textContent = 'Invalid syndicate coupon. Enterprise pricing remains firm.';
                    couponMsg.style.color = '#fca5a5';
                } else {
                    couponMsg.style.display = 'none';
                }
            });
        }
    }

    // DOM Ready Initialization
    document.addEventListener('DOMContentLoaded', () => {
        initTelemetry();
        initFormInterceptors();
        checkPostMutationToast();
        initModals();
        initComplianceBanner();
        initCoupon();
    });
})();
