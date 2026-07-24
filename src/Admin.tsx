import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubmissions, Submission, getSubmissionScoresAndStatus } from './store';
import { auth, db, storage } from './firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, onSnapshot, query, setDoc, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { SubmissionView } from './SubmissionView';
import { 
  LogOut, Shield, Download, Trash2, ArrowUpDown, ChevronDown, Check,
  FileText, Users, Plus, Edit2, X, ArrowLeft, Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ROOT_ADMIN = 'javed.cheema2000@gmail.com';

interface AppUser {
  email: string;
  role: 'admin' | 'editor';
}

export function Admin() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [appRole, setAppRole] = useState<'admin' | 'editor' | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Tabs
  const [activeTab, setActiveTab] = useState<'records' | 'users'>('records');

  // Viewing Submission
  const [viewingSubmission, setViewingSubmission] = useState<{ submission: Submission } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        if (u.email === ROOT_ADMIN) {
          setAppRole('admin');
        } else {
          // Query users collection for role
          const docRef = doc(db, 'users', u.email!);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setAppRole(docSnap.data().role as 'admin' | 'editor');
          } else {
            setAppRole(null); // No access
          }
        }
      } else {
        setAppRole(null);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => signOut(auth);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="absolute top-4 left-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" /> Patient Form
          </button>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full text-center border border-slate-100">
          <Shield className="w-12 h-12 mx-auto text-blue-600 mb-4" />
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Staff Portal</h1>
          <p className="text-slate-500 mb-8 text-sm">Please sign in with your authorized Google account to continue.</p>
          <button 
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  if (user && !appRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full text-center border border-slate-100">
          <Shield className="w-12 h-12 mx-auto text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Access Denied</h1>
          <p className="text-slate-500 mb-6 text-sm">{user.email}</p>
          <p className="text-slate-600 mb-8 text-sm">You do not have permission to access this portal.</p>
          <button 
            onClick={handleLogout}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  if (viewingSubmission) {
    return (
      <SubmissionView 
        selectedSubmission={viewingSubmission.submission} 
        onBack={() => setViewingSubmission(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between sticky top-0 z-40 gap-4 sm:gap-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">Staff Portal</h1>
          </div>
          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
          <nav className="flex gap-2">
            <button
              onClick={() => setActiveTab('records')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${activeTab === 'records' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <FileText className="w-4 h-4" />
              Records
            </button>
            {appRole === 'admin' && (
              <button
                onClick={() => setActiveTab('users')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${activeTab === 'users' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <Users className="w-4 h-4" />
                Users
              </button>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-xs font-semibold text-slate-500 hover:text-slate-800 mr-2 flex items-center gap-1"><ArrowLeft className="w-3 h-3"/> Patient Form</button>
          <div className="text-right hidden sm:block">
            <div className="text-sm font-semibold text-slate-800">{user.email}</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{appRole}</div>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full">
        {activeTab === 'records' ? (
          <RecordsView onView={setViewingSubmission} />
        ) : (
          <UsersView />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 px-6 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Metric title="Document Writes" used={15} limit={50} unit="K" />
            <Metric title="Document Reads" used={42} limit={50} unit="K" />
            <Metric title="Storage Volume" used={2.1} limit={5.0} unit="GB" />
            <Metric title="Network Bandwidth" used={4.5} limit={10} unit="GB" />
          </div>
        </div>
      </footer>
    </div>
  );
}

function Metric({ title, used, limit, unit }: { title: string, used: number, limit: number, unit: string }) {
  const percent = Math.min(100, Math.round((used / limit) * 100));
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">{title}</div>
      <div className="flex justify-between text-sm font-semibold mb-1">
        <span className="text-slate-800">{used}{unit}</span>
        <span className="text-slate-400">{limit}{unit} limit</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}

// ---- RECORDS VIEW ----

function RecordsView({ onView }: { onView: (state: { submission: Submission }) => void }) {
  const { submissions, loading } = useSubmissions();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sortField, setSortField] = useState<keyof Submission>('date');
  const [sortDir, setSortDir] = useState<'asc'|'desc'>('desc');
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [lastClickedId, setLastClickedId] = useState<string | null>(null);

  const toggleSelection = (id: string, shiftKey: boolean) => {
    const newSet = new Set(selectedIds);
    
    if (shiftKey && lastClickedId) {
      // Find indices
      const sorted = filteredAndSorted;
      const startIdx = sorted.findIndex(s => s.id === lastClickedId);
      const endIdx = sorted.findIndex(s => s.id === id);
      if (startIdx !== -1 && endIdx !== -1) {
        const min = Math.min(startIdx, endIdx);
        const max = Math.max(startIdx, endIdx);
        const selecting = !selectedIds.has(id);
        for (let i = min; i <= max; i++) {
          if (selecting) newSet.add(sorted[i].id);
          else newSet.delete(sorted[i].id);
        }
      }
    } else {
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
    }
    
    setSelectedIds(newSet);
    setLastClickedId(id);
  };

  const toggleAll = () => {
    if (selectedIds.size === filteredAndSorted.length && filteredAndSorted.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredAndSorted.map(s => s.id)));
    }
  };

  const handleSort = (field: keyof Submission) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const handleDelete = async (ids: string[]) => {
    if (ids.length === 0) return;
    for (const id of ids) {
      await deleteDoc(doc(db, 'submissions', id));
    }
    setSelectedIds(new Set());
  };

  const handleDownload = (ids: string[]) => {
    // We mock download sequentially
    ids.forEach((id, index) => {
      const sub = submissions.find(s => s.id === id);
      if (sub) {
        setTimeout(() => {
          // Open in new window to print/save as pdf since we can't fully control pdf generation here easily without blocking
          const originalTitle = document.title;
          document.title = `${sub.patientId}_ASQ3_${sub.month}Mo`;
          // Trigger a view and print, but since this is mass action, we will just view the first one to trigger print
          onView({ submission: sub });
          setTimeout(() => {
            window.print();
            document.title = originalTitle;
          }, 500);
        }, index * 2000);
      }
    });
    setSelectedIds(new Set());
  };

  const filteredAndSorted = useMemo(() => {
    let result = [...submissions];

    // Apply filters
    Object.keys(filters).forEach(key => {
      const activeFilters = filters[key];
      if (activeFilters && activeFilters.length > 0) {
        result = result.filter(s => activeFilters.includes(String(s[key as keyof Submission] || '')));
      }
    });

    // Apply sort
    result.sort((a, b) => {
      let aVal: any = a[sortField] || '';
      let bVal: any = b[sortField] || '';
      
      if (sortField === 'date') {
        aVal = new Date(a.date).getTime();
        bVal = new Date(b.date).getTime();
      } else if (sortField === 'month') {
        aVal = parseInt(a.month as string) || 0;
        bVal = parseInt(b.month as string) || 0;
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc' 
          ? aVal.localeCompare(bVal, undefined, { sensitivity: 'base' }) 
          : bVal.localeCompare(aVal, undefined, { sensitivity: 'base' });
      }

      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [submissions, sortField, sortDir, filters]);

  const uniqueValues = (field: keyof Submission) => {
    return Array.from(new Set(submissions.map(s => String(s[field] || ''))))
      .filter(Boolean)
      .sort();
  };

  if (loading) {
    return <div className="p-12 text-center text-slate-500">Loading records...</div>;
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-180px)]">
      {/* Mass Actions Portal Area (Rendered in header normally, but we put it here for simplicity) */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between min-h-[60px]">
        <h2 className="text-lg font-bold text-slate-800">Medical Records</h2>
        <AnimatePresence>
          {selectedIds.size > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-3"
            >
              <button 
                onClick={() => handleDownload(Array.from(selectedIds))}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50"
              >
                <Download className="w-4 h-4" />
                Download {selectedIds.size}
              </button>
              <button 
                onClick={() => handleDelete(Array.from(selectedIds))}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-bold shadow-sm hover:bg-red-100"
              >
                <Trash2 className="w-4 h-4" />
                Delete {selectedIds.size}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="overflow-auto flex-1 relative">
        <table className="w-full text-left border-collapse min-w-[1100px]">
          <thead className="bg-white sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="px-6 py-4 w-12 border-b border-slate-200">
                <input 
                  type="checkbox" 
                  checked={selectedIds.size > 0 && selectedIds.size === filteredAndSorted.length}
                  ref={input => {
                    if (input) {
                      input.indeterminate = selectedIds.size > 0 && selectedIds.size < filteredAndSorted.length;
                    }
                  }}
                  onChange={toggleAll}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
              </th>
              <th className="px-4 py-4 w-32 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Actions
              </th>
              <Th 
                label="Patient ID" field="patientId" sortField={sortField} sortDir={sortDir} 
                onSort={handleSort} options={uniqueValues('patientId')} filters={filters} 
                setFilters={setFilters} openFilter={openFilter} setOpenFilter={setOpenFilter}
              />
              <Th 
                label="AGE" field="month" sortField={sortField} sortDir={sortDir} 
                onSort={handleSort} options={uniqueValues('month')} filters={filters} 
                setFilters={setFilters} openFilter={openFilter} setOpenFilter={setOpenFilter}
              />
              <Th 
                label="PT. INITIALS" field="fillerName" sortField={sortField} sortDir={sortDir} 
                onSort={handleSort} options={uniqueValues('fillerName')} filters={filters} 
                setFilters={setFilters} openFilter={openFilter} setOpenFilter={setOpenFilter}
              />
              <Th 
                label="RELATIONSHIP" field="relationship" sortField={sortField} sortDir={sortDir} 
                onSort={handleSort} options={uniqueValues('relationship')} filters={filters} 
                setFilters={setFilters} openFilter={openFilter} setOpenFilter={setOpenFilter}
              />
              <Th 
                label="ARRIVAL DATE / TIME" field="date" sortField={sortField} sortDir={sortDir} 
                onSort={handleSort} options={[]} filters={filters} 
                setFilters={setFilters} openFilter={openFilter} setOpenFilter={setOpenFilter}
              />
              <th className="px-2 py-4 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center" title="Communication">C</th>
              <th className="px-2 py-4 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center" title="Gross Motor">GM</th>
              <th className="px-2 py-4 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center" title="Fine Motor">FM</th>
              <th className="px-2 py-4 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center" title="Problem Solving">Pb</th>
              <th className="px-2 py-4 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center" title="Personal Social">PS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <AnimatePresence>
              {filteredAndSorted.map((sub, index) => (
                <motion.tr 
                  layout
                  initial={{ opacity: 0, backgroundColor: '#fff' }}
                  animate={{ 
                    opacity: 1, 
                    backgroundColor: selectedIds.has(sub.id) 
                      ? '#FEF9C3' 
                      : (index % 2 === 0 ? '#F8FAFC' : '#ffffff') 
                  }}
                  exit={{ opacity: 0 }}
                  key={sub.id}
                  onClick={(e) => toggleSelection(sub.id, e.shiftKey)}
                  className="hover:bg-slate-50 cursor-pointer group transition-colors"
                >
                  <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.has(sub.id)}
                      onChange={(e) => toggleSelection(sub.id, (e.nativeEvent as any).shiftKey)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                  </td>
                  <td className="px-4 py-4" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center gap-2">
                      <button onClick={() => onView({ submission: sub })} className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete([sub.id])} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-slate-800 whitespace-nowrap">{sub.patientId}</td>
                  <td className="px-4 py-4 text-xs text-slate-600 whitespace-nowrap">{sub.month} Mo</td>
                  <td className="px-4 py-4 text-xs font-mono uppercase text-slate-600 whitespace-nowrap">{sub.fillerName}</td>
                  <td className="px-4 py-4 text-xs text-slate-600 capitalize whitespace-nowrap">{sub.relationship || 'N/A'}</td>
                  <td className="px-4 py-4 text-xs text-slate-600 whitespace-nowrap">
                    {new Date(sub.date).toLocaleString('en-US', {
                      month: '2-digit', day: '2-digit', year: '2-digit',
                      hour: '2-digit', minute: '2-digit', hour12: true
                    })}
                  </td>
                  {(() => {
                    const result = getSubmissionScoresAndStatus(sub);
                    const isSectionEdited = (prefix: string) => {
                      if (!sub.originalAnswers) return false;
                      for (let i = 1; i <= 6; i++) {
                        const qId = `${sub.month}_${prefix}_${i}`;
                        if ((sub.answers[qId] || '') !== (sub.originalAnswers[qId] || '')) {
                          return true;
                        }
                      }
                      return false;
                    };
                    const getCell = (key: string) => {
                      const s = result.scores?.find(x => x.key === key);
                      if (!s) return <td key={key} className="px-2 py-4 text-center text-xs text-slate-400">N/A</td>;
                      const edited = isSectionEdited(key);
                      const bgBase = s.status === 'normal' 
                        ? 'bg-[#D1FAE5] text-[#064E3B]' 
                        : s.status === 'borderline' 
                          ? 'bg-[#FED7AA] text-[#78350F]' 
                          : 'bg-[#FECACA] text-[#7F1D1D]';
                      const bg = edited 
                        ? `${bgBase} bg-admin-edited border-[2px] border-purple-600 !text-purple-900 font-black shadow-sm`
                        : `${bgBase} border-[2px] border-transparent`;
                      return (
                        <td key={key} className={`px-2 py-4 text-xs font-bold text-center ${bg}`} title={`${s.label}: ${s.score} (Cutoff: ${s.cutoff}, Black: ${s.black}, Gray: ${s.gray})`}>
                          {s.score}
                        </td>
                      );
                    };
                    return (
                      <>
                        {getCell('c')}
                        {getCell('gm')}
                        {getCell('fm')}
                        {getCell('ps')}
                        {getCell('pe')}
                      </>
                    );
                  })()}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {filteredAndSorted.length === 0 && (
          <div className="p-12 text-center text-slate-500">No records found.</div>
        )}
      </div>
    </div>
  );
}

function Th({ label, field, sortField, sortDir, onSort, options, filters, setFilters, openFilter, setOpenFilter }: any) {
  const isOpen = openFilter === field;
  const activeFilters = filters[field] || [];
  
  return (
    <th className="px-4 py-4 border-b border-slate-200 relative select-none">
      <div className="flex items-center gap-1">
        <div 
          className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest cursor-pointer hover:text-slate-800"
          onClick={() => onSort(field)}
        >
          {label}
          {sortField === field && <ArrowUpDown className="w-3 h-3" />}
        </div>
        {options.length > 0 && (
          <button onClick={(e) => { e.stopPropagation(); setOpenFilter(isOpen ? null : field); }} className={`ml-auto p-1 rounded hover:bg-slate-100 ${activeFilters.length > 0 ? 'text-blue-600' : 'text-slate-400'}`}>
            <ChevronDown className="w-3 h-3" />
          </button>
        )}
      </div>

      {isOpen && options.length > 0 && (
        <div className="absolute top-full left-4 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-50 p-2 max-h-60 overflow-y-auto" onClick={e => e.stopPropagation()}>
          {options.map((opt: string) => (
            <label key={opt} className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded cursor-pointer">
              <input 
                type="checkbox"
                checked={activeFilters.includes(opt)}
                onChange={(e) => {
                  const newFilters = { ...filters };
                  if (e.target.checked) {
                    newFilters[field] = [...(newFilters[field] || []), opt];
                  } else {
                    newFilters[field] = newFilters[field].filter((f: string) => f !== opt);
                  }
                  setFilters(newFilters);
                }}
                className="rounded border-slate-300 text-blue-600 w-3.5 h-3.5"
              />
              <span className="text-xs text-slate-700">{opt}</span>
            </label>
          ))}
        </div>
      )}
    </th>
  );
}

// ---- USERS VIEW ----

function UsersView() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'admin'|'editor'>('editor');
  
  const [editingEmail, setEditingEmail] = useState<string | null>(null);
  const [editRole, setEditRole] = useState<'admin'|'editor'>('editor');
  
  const [deletingEmail, setDeletingEmail] = useState<string | null>(null);

  const [sortField, setSortField] = useState<keyof AppUser>('email');
  const [sortDir, setSortDir] = useState<'asc'|'desc'>('asc');
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snap) => {
      const u: AppUser[] = [];
      snap.forEach(d => {
        u.push({ email: d.id, role: d.data().role });
      });
      setUsers(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAdd = async () => {
    const email = newUserEmail.trim().toLowerCase();
    if (!email || email === ROOT_ADMIN || users.find(u => u.email === email)) return;
    await setDoc(doc(db, 'users', email), { role: newUserRole });
    setNewUserEmail('');
    setNewUserRole('editor');
  };

  const handleSaveEdit = async (email: string) => {
    await setDoc(doc(db, 'users', email), { role: editRole });
    setEditingEmail(null);
  };

  const handleDelete = async (email: string) => {
    await deleteDoc(doc(db, 'users', email));
    setDeletingEmail(null);
  };

  const handleSort = (field: keyof AppUser) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const filteredAndSorted = useMemo(() => {
    let result = [...users];

    // Apply filters
    Object.keys(filters).forEach(key => {
      const activeFilters = filters[key];
      if (activeFilters && activeFilters.length > 0) {
        result = result.filter(u => activeFilters.includes(String(u[key as keyof AppUser])));
      }
    });

    // Apply sort
    result.sort((a, b) => {
      const aVal = String(a[sortField]);
      const bVal = String(b[sortField]);
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [users, sortField, sortDir, filters]);

  const uniqueValues = (field: keyof AppUser) => {
    return Array.from(new Set(users.map(u => String(u[field])))).sort();
  };

  if (loading) return <div className="p-12 text-center text-slate-500">Loading users...</div>;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-180px)]">
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">System Users</h2>
      </div>
      
      <div className="overflow-auto flex-1 relative">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="px-6 py-4 w-12 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest">#</th>
              <Th 
                label="User Email" field="email" sortField={sortField} sortDir={sortDir} 
                onSort={handleSort} options={uniqueValues('email')} filters={filters} 
                setFilters={setFilters} openFilter={openFilter} setOpenFilter={setOpenFilter}
              />
              <Th 
                label="Role" field="role" sortField={sortField} sortDir={sortDir} 
                onSort={handleSort} options={['admin', 'editor']} filters={filters} 
                setFilters={setFilters} openFilter={openFilter} setOpenFilter={setOpenFilter}
              />
              <th className="px-6 py-4 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-48 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {/* Root Admin Row */}
            <tr className="bg-blue-50/50">
              <td className="px-6 py-4 text-xs font-bold text-blue-400">1</td>
              <td className="px-4 py-4 text-sm font-semibold text-blue-900">{ROOT_ADMIN}</td>
              <td className="px-4 py-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-[10px] font-bold uppercase tracking-widest">System Admin</span>
              </td>
              <td className="px-6 py-4 text-right"></td>
            </tr>

            <AnimatePresence>
              {filteredAndSorted.map((u, i) => (
                <motion.tr 
                  layout
                  key={u.email} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-slate-50"
                >
                  <td className="px-6 py-4 text-xs font-bold text-slate-400">{i + 2}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-slate-800">{u.email}</td>
                  
                  <td className="px-4 py-4">
                    {editingEmail === u.email ? (
                      <select 
                        value={editRole}
                        onChange={e => setEditRole(e.target.value as 'admin'|'editor')}
                        className="text-sm border border-slate-300 rounded px-2 py-1 outline-none focus:border-blue-500"
                      >
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-600'}`}>
                        {u.role}
                      </span>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 text-right">
                    {editingEmail === u.email ? (
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleSaveEdit(u.email)} className="text-xs font-bold text-green-600 hover:text-green-700 px-3 py-1.5 bg-green-50 rounded">Save</button>
                        <button onClick={() => setEditingEmail(null)} className="text-xs font-bold text-slate-500 hover:text-slate-700 px-3 py-1.5 bg-slate-100 rounded">Cancel</button>
                      </div>
                    ) : deletingEmail === u.email ? (
                      <div className="flex justify-end gap-2 items-center">
                        <span className="text-xs font-semibold text-slate-500 mr-2">Delete?</span>
                        <button onClick={() => handleDelete(u.email)} className="text-xs font-bold text-white hover:bg-red-700 px-3 py-1.5 bg-red-600 rounded">Yes</button>
                        <button onClick={() => setDeletingEmail(null)} className="text-xs font-bold text-slate-600 hover:bg-slate-200 px-3 py-1.5 bg-slate-100 rounded">Cancel</button>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-2">
                        <button onClick={() => { setEditingEmail(u.email); setEditRole(u.role); setDeletingEmail(null); }} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => { setDeletingEmail(u.email); setEditingEmail(null); }} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>

            {/* Inline Add Row */}
            <tr className="bg-slate-50 border-t-2 border-slate-200">
              <td className="px-6 py-4 text-xs font-bold text-slate-400">+</td>
              <td className="px-4 py-4">
                <input 
                  type="email"
                  placeholder="new.user@email.com"
                  value={newUserEmail}
                  onChange={e => setNewUserEmail(e.target.value)}
                  className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </td>
              <td className="px-4 py-4">
                <select 
                  value={newUserRole}
                  onChange={e => setNewUserRole(e.target.value as 'admin'|'editor')}
                  className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                >
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="px-6 py-4 text-right">
                <button 
                  onClick={handleAdd}
                  disabled={!newUserEmail.trim()}
                  className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add User
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
